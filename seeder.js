const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const { parse } = require("path");
const e = require("express");
const uri = "mongodb://localhost:27017/YouthGroup";
const client = new MongoClient(uri);

async function main() {
    await client.connect();
    const db = client.db();
    const results = await db.collection("RAW").find({}).count();

    //if there is no data in db, import it from JSON file
    try{

        if(!results)
        {
            const load = loading("importing Youth Data Base").start();
            const data = await fs.readFile(path.join(__dirname, "youthGroup.json"), "utf-8");
            await db.collection("RAW").insertMany(JSON.parse(data));

            const youthsRef = await db.collection("RAW").aggregate([
                { $match: { youth_FullName: { $ne: null } } },
                {
                  $group: {
                    _id: "$_id",
                    youth_FullName: "$youth_FullName",
                    youth_Sex: "$youth_Sex",
                    youth_email: "$youth_email",
                    parentsEmail: "$parentsEmail",
                    youth_MedicinalRequirements: "$youth_MedicinalRequirements",
                    youth_Allergies: "$youth_Allergies",
                    youth_DoB: "$youth_DoB",
                    youth_OtherNotes: "$youth_OtherNotes",
                    interest_1: "$interests_1", 
                    interest_2: "$interests_2",
                    meetingDates: "$meetingDates",
                  },
                },
                { $set: { name: "$youth_FullName", youth_Sex: "$youth_Sex", youth_email: "$youth_email", parentsEmail: "$parentsEmail",
                 youth_MedicinalRequirements: "$youth_MedicinalRequirements", youth_Allergies: "$youth_Allergies", youth_DoB: "$youth_DoB",
                  youth_OtherNotes: "$youth_OtherNotes", interest_1: "$interests_1", interest_2: "$interests_2", meetingDates: "$meetingDates", } },
                ]);

                /**
                 * Below, we output the results of our aggregate into a
                 * new collection
                 */

                const youths = await youthsRef.toArray();
                await db.collection("youths").insertMany(youths);
            
                /** This data manipulation is to reference each document in the
                 * RAW collection to a youth id. Further to this we also take the opportunity to
                 * tidy up points (converting it to a int) and regions, adding them to a an array
                 */
            
                const updatedyouthsRef = db.collection("youths").find({});
                const updatedyouths = await updatedyouthsRef.toArray();
                updatedyouths.forEach(async ({ _id, name }) => {
                    await db.collection("youths").updateMany({ youth_FullName: name }, [
                    {
                        $set: {
                        youth_id: _id,
                        interests: {$push: ["$interest_1", "$interest_2"]},
                        meetingDates: {$push: WeekArrayAdder(), $toBool: {$attended}},
                        },
                    },
                    ]);
                });
            load.stop();
            console.info("Youth DataBase set up");

        }
        else{
            console.info("Db already exists");
        }
        process.exit();
    }
    catch(error){
        console.error("error:", error);
        process.exit();
    }
}

function WeekArrayAdder(){
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    var date = new Date("2020-11-22");
    var weekArray = [date];

    var i = 0;
    while(i < 5000) {
        date = date.addDays(7);
        weekArray.push(date);

        i++
    }
    return weekArray;
}

main();