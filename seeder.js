const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const uri = "mongodb://localhost:27017/wine";
const client = new MongoClient(uri);