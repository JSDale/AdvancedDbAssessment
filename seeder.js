const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const { parse } = require("path");
const e = require("express");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jsdale:2dJV5SpYTraV2ST@youthgroup.w8his.mongodb.net/YothGroup?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

async function main() {
    await client.connect();
    const db = client.db();
    db.dropDatabase();
    const results = await db.collection("youths").find({}).count();
    const quoteResults = await db.collection("quotes").find({}).count();

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
                attendance: CreateAttendanceArray(),
                },
            },
            ]);

            await db
            .collection("youths")
            .updateMany({}, { $unset: { interest_1: "", interest_2: " " } });

            load.stop();
            console.info("Youth collection set up");
        
        }
        else{
            console.info("Db already exists");
        }

        if(!quoteResults)
        {
            db.createCollection("quotes");
            const load = loading("importing Quote Date Base").start();
            const data = await fs.readFile(path.join(__dirname, "bibleQuotes.json"), "utf-8");
            await db.collection("quotes").insertMany(JSON.parse(data));
            load.stop();
            console.info("Quote collection set up");
        }

        process.exit();
    }
    catch(error){
        console.error("error:", error);
        process.exit();
    }
}

function CreateAttendanceArray(){
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    var date = new Date("2020-11-22");
    var attendanceArray = []; 

    var i = 0;
    while(i < 100) {
        date = date.addDays(7);
        var subWeekArray = [date.toString(), "false"];
        attendanceArray.push(subWeekArray);

        i++;
    }

    return attendanceArray;
}

main();