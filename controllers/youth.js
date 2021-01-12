const Youth = require('../models/Youth');
const bcrypt = require('bcrypt');
const { request } = require('express');

exports.login = async (req, res) => {
    try {
        const user = await Youth.findOne({ youth_email: req.body.email });
        if (!user) {
            res.render('login-user', { errors: { email: { message: 'email not found' } } })
            return;
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        
        if (match) {
            req.session.userID = user._id;
            console.log(req.session.userID);
            res.redirect('/');
            console.log("authenticated");
            return
        }

        res.render('login-user', { errors: { password: { message: 'password does not match' } } })


    } catch (e) {
        console.log(e);
        return res.status(400).send({
            message: "Error loggin in",
        });
    }
};

exports.create = async (req, res) => {
    try{
        console.log("hit");
        //default values of non-essential inputs
        var youth_Gender = "Not Known";
        var youth_MedicinalRequirements = "N/A";
        var youth_Allergies = "N/A";
        var youth_DoB = "N/A";
        var youth_OtherNotes = "N/A";
        var interestTwo = "N/A";

        if (req.body.youthGender ) {
            youth_Gender = req.body.youthGender;
        }
        if (req.body.youth_MedicinalRequirements ) {
            youth_MedicinalRequirements = req.body.youth_MedicinalRequirements;
        }
        if (req.body.youth_Allergies ) {
            youth_Allergies = req.body.youth_Allergies;
        }
        if (req.body.youth_DoB ) {
            youth_DoB = req.body.youth_DoB;
        }
        if (req.body.youthOtherNotes ) {
            youth_OtherNotes = req.body.youth_OtherNotes;
        }
        if(req.body.interestTwo){
            interestTwo = req.body.interestTwo;
        }

        const youth = new Youth({
            youth_email: req.body.email,
            password: req.body.password,
            parentsEmail: req.body.parentsEmail,
            youth_FullName: req.body.youth_FullName,
            youth_Gender: youth_Gender,
            youth_MedicinalRequirements: youth_MedicinalRequirements,
            youth_Allergies: youth_Allergies,
            youth_DoB: youth_DoB,
            youth_OtherNotes: youth_OtherNotes,
            interestOne: req.body.interestOne,
            interestTwo: interestTwo
        });
        console.log("saving");
        await save(youth);
        console.log("saved");
        res.redirect('/login?message=account created');
    }
    catch(e){
        if(e.errors){
            res.render('create-user', {errors: e.errors});
            return;
        }
        console.log(e);
        return res.status(400).send({ message: "couldn't save user" });
    }
};

async function save(youth)
{
    //Youth.save(youth);
    await youth.save();
}

exports.ViewProfile = async (req, res) => {
    res.render("view_profile");
}

exports.DeleteProfile = async (req, res) => {
    const id = req.params.id;
    try {
        await Youth.findByIdAndRemove(id);
        res.redirect("/logout");
      } catch (e) {
        res.status(404).send({
          message: `could not delete  record ${id}.`,
        });
      }
};

exports.EditProfile = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await Youth.findById(id);
        res.render('update-user', {user: user, id: id});
    }catch (e){
        res.status(404).send({
            message: `could not find user: ${id}`,
        });
    }
};

exports.Update = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await Youth.updateOne({_id: id}, req.body);
        res.redirect('/view-profile?profile updated');
    } catch(ex){
        res.status(404).send({
            message: `could not update ${id}.`,
        });
    }
};

exports.AllProfiles = async (req, res) => {
    try{
        const youths = await Youth.find({});
        res.render("all-profiles", {youths: youths})
    } catch(ex) {
        res.status(404).send({ message: "could not list the kids" });
    }
    
};