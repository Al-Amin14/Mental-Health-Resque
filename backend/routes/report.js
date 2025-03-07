const express = require('express');
const routers = express.Router();
const Report = require('../model/Report.js');
const handleusers = require('../middleware/handleusers.js'); 
const User = require('../model/signUp.js');
const mongoose=require('mongoose')




routers.post('/submitReport', handleusers, async (req, res) => {
    try {
        const { condition } = req.body;
        if (!condition) {
            return res.status(400).json({ error: "Condition is required" });
        }
        
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const newReport = new Report({
            user: req.user._id,
            username: user.fullname,
            condition
        });
        
        await newReport.save().then(result=>{

            res.status(201).json({ success: "Report submitted successfully" , datas: result});
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

routers.get('/myReports', handleusers ,async (req,res)=>{
    try {
        const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.json(reports);
    } catch (error) {
        console.log(error)
        res.status(422).json({ error: "Internal Server Error" });
    }
})

routers.get('/totalreports',(req,res)=>{
    Report.find().populate("user","-password").sort({createdAt:-1}).then(result=>
        res.json(result)
    ).catch(error=>{
        res.status(422).json({error:error})
    })
})

module.exports = routers;
