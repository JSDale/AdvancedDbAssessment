const Youth = require('../models/Youth');

exports.AttendanceList = async (req, res) => {
    try{
        const youths = await Youth.find({});
        res.render("attendance-tracker", {youths: youths});
    } catch(ex) {
        res.status(404).send({ message: "could not list the kids" });
    }
};