const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const handleusers = require('../middleware/handleusers'); 
const User = require('../models/signUp');


router.post('/submitReport', handleusers, async (req, res) => {
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

        await newReport.save();
        res.status(201).json({ success: "Report submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/myReports', handleusers, async (req, res) => {
    try {
        const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

