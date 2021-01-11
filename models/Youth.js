const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

console.log("creating schema");
try{
    const youthSchema = new Schema(
    {
        youth_email: { type: String, required: [true, 'email is required'], unique: true },
        password: { type: String, required: [true, 'password is required'], minlength: [7, "Name must be 8 characters long"] },
        youth_FullName: {type: String, required: [true, 'name is required'], unique: false},
        youth_Gender: {type: String, required: false, unique: false},
        parentsEmail: {type: String, required: [true, 'parents email is required'], unique: false},
        youth_MedicinalRequirements: {type: String, required: false, unique: false},
        youth_Allergies: {type: String, required: false, unique: false},
        youth_DoB: {type: String, required: false, unique: false},
        youth_OtherNotes: {type: String, required: false, unique: false},
        interest: {type: Array, required: [true, 'Please add an interest'], unique: false},
        attendance: {type: Array, required: true, unique: false}
    }
    );

    youthSchema.pre('save', async function (next) {

        try{
            console.log("creating hashed password array");
            const hash = await bcrypt.hash(this.password, 10);
            this.password = hash;
            console.log(this.password);
            next();
        }
        catch(e) {
            throw Error('could not hash password');
        }
        
        try{
            console.log("creating attendance array");
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
        
            this.attendance = attendanceArray;
            next();
        }
        catch(ex){
            throw Error('could not create attendance array');
        }
    })

    module.exports = mongoose.model("Youth", youthSchema);
}
catch(ex){
    console.log(ex);
}