const Youth = require('../models/Youth');
const bcrypt = require('bcrypt');
const { request } = require('express');

exports.login = async (req, res) => {
    try {
        const youth = await Youth.findOne({ youth_email: req.body.email });
        if (!youth) {
            res.render('login-user', { errors: { email: { message: 'email not found' } } })
            return;
        }

        const match = await bcrypt.compare(req.body.password, youth.password);
        
        if (match) {
            req.session.userID = user._id;
            console.log(req.session.userID);
            res.redirect('/');
            console.log("authenticated");
            return
        }

        res.render('login-user', { errors: { password: { message: 'password does not match' } } })


    } catch (e) {
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}

exports.create = async (req, res) => {
    try{
        console.log("hit");
        //default values of non-essential inputs
        var youth_Gender = "Not Known";
        var youth_MedicinalRequirements = "N/A";
        var youth_Allergies = "N/A";
        var youth_DoB = "N/A";
        var youth_OtherNotes = "N/A";
        var interests = new Array (req.body.interests);

        if (req.body.youthGender =="") {
            youth_Gender = req.body.youthGender;
        }
        if (req.body.youth_MedicinalRequirements == "") {
            youth_MedicinalRequirements = req.body.youth_MedicinalRequirements;
        }
        if (req.body.youth_Allergies == "") {
            youth_Allergies = req.body.youth_Allergies;
        }
        if (req.body.youth_DoB == "") {
            youth_DoB = req.body.youth_DoB;
        }
        if (req.body.youthOtherNotes == "") {
            youth_OtherNotes = req.body.youthOtherNotes;
        }

        console.log("hit defaults");
        const youth = new Youth({
            youth_email: req.body.email, 
            password: req.body.password, 
            parentsEmail: req.body.parentsEmail,
            youth_FullName: req.body.youthFullName,
            youth_Gender: youth_Gender,
            youth_MedicinalRequirements: youth_MedicinalRequirements,
            youth_Allergies: youth_Allergies,
            youth_DoB: youth_DoB,
            youthOtherNotes: youth_OtherNotes,
            interests: interests
        });
        console.log("saving");
        await youth.save();
        console.log("saved");
        res.redirect('/?message=account created');
    }
    catch(e){
        if(e.errors){
            res.render('create-user', {errors: e.errors});
            return;
        }
        console.log(e);
        return res.status(400).send({ message: "couldn't save user" });
    }
}