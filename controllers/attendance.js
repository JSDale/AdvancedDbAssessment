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

    //var attendances = CreateAttendanceArray();

    var attendances = await tempYouth.attendance;
    //console.log(tempYouth.attendance);
    var attendanceStr = await attendances.toString();
    var attendanceArr = await attendanceStr.split(",");
    var newArr = new Array;
    let j = 0;
    for( var k=0; k < attendanceArr.length; k++){
        newArr.push(new Array(attendanceArr[j], attendanceArr[j+1]));
        j = j+2;
        
        if(attendanceArr[j] == null){
            k = 100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;
        }
    }

    //console.log(newArr);

    let i = 0;
    newArr.forEach(week => {
        console.log(week);
        if(week.includes(date.toString()))
        {
            week[1] = week[1].toString().replace("false", "true");
            console.log(newArr[i]);
            console.log(i);
        }

        i++
    });

    try{
        console.log(id);
        const user = await Youth.updateOne({_id: id}, {"$set" : {"attendance" : newArr}});
        res.redirect('/?updated attendance');
    }
    catch(e){
        res.status(404).send({
            message: `could not update attendance for: ${id}.`,
        });
        console.log(e);
    }
};