const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const { parse } = require("path");
const uri = "mongodb://localhost:27017/YouthGroup";
const client = new MongoClient(uri);

async function main() {
    await client.connect();
    const db = client.db();
    const results = await db.collection("youths").find({}).count();

    //if there is no data in db, import it from JSON file
    if(!results)
    {
        const data = await fs.readFile(path.join(__dirname, "youthGroup.json"), "utf-8");
        await db.collection("youths").insertMany(JSON.parse(data));
    }

    
}

main();