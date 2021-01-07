const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: { type: String, required: [true, 'username is required'], unique: true },
    password: { type: String, required: [true, 'password is required'], minlength: [7, "Name must be 8 characters long"] },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
    //logging
    //console.log(this.password); //this is bad practice, DO NOT DO IN PRODUCTION!!

    try{
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        console.log(this.password);
        next();
    }
    catch(e) {
        throw Error('could not hash password');
    }
})

module.exports = mongoose.model("User", userSchema);