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
    const results = await db.collection("youths").find({}).count();

    //if there is no data in db, import it from JSON file
    try{

        if(!results)
        {
            const load = loading("importing Youth Data Base").start();
            const data = await fs.readFile(path.join(__dirname, "youthGroup.json"), "utf-8");
            await db.collection("youths").insertMany(JSON.parse(data));

            await db.collection("youths").updateMany({}, [
            {
                $set: {
                interests: ["$interest_1", "$interest_2"],
                meetingDates: [WeekArrayAdder(), "$attended"],
                },
            },
            ]);
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