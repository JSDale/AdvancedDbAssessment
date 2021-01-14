const Youth = require('../models/Youth');

exports.AttendanceList = async (req, res) => {
    try{
        const youths = await Youth.find({});
        res.render("attendance-tracker", {youths: youths});
    } catch(ex) {
        res.status(404).send({ message: "could not list the kids" });
    }
};

exports.UpdateAttendance = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    let attended = req.body.attended;
    console.log(attended);
    let dateStr = req.body.attendanceDate;
    console.log(dateStr);
    let date = new Date(dateStr);
    console.log(date);
    tempYouth = await Youth.findById(id);

    var attendances = await tempYouth.attendance;
    var attendanceStr = await attendances.toString();
    var attendanceArr = await attendanceStr.split(",");
    var newArr = new Array;
    let j = 0;
    for( var k=0; k < attendanceArr.length; k++){
        newArr.push(new Array(attendanceArr[j], attendanceArr[j+1]));
        j = j+2;
        
        //this is so the for each doesn't add null entries to the attendance array.
        if(attendanceArr[j] == null){
            k = 100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
        }
    }

    let i = 0;
    let updated = false;
    newArr.forEach(week => {
        if(week.includes(date.toString()))
        {
            week[1] = attended;
            console.log(newArr[i]);
            console.log(i);
            updated = true;
        }
        i++
    });

    if(updated == false) {
        res.status(404).send({
            message: `could not update attendance, week not available.`,
        });
        return;
    }

    try{
        console.log(id);
        const user = await Youth.updateOne({_id: id}, {"$set" : {"attendance" : newArr}});
        res.redirect('/?updated attendance');
    }
    catch(e){
        console.log(e);
        res.status(404).send({
            message: `could not update attendance for: ${id}.`,
        });
    }
};