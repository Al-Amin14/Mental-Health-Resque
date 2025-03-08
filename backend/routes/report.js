const express = require('express');
const routers = express.Router();
const Report = require('../model/Report.js');
const handleusers = require('../middleware/handleusers.js'); 
const User = require('../model/signUp.js');
const mongoose = require('mongoose');

// API 11: Fetch reports with pagination
routers.get('/paginatedReports', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const reports = await Report.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// API 12: Search reports by condition (case insensitive)
routers.get('/searchReports', async (req, res) => {
    try {
        const { keyword } = req.query;
        if (!keyword) {
            return res.status(400).json({ error: "Search keyword is required" });
        }

        const reports = await Report.find({ 
            condition: { $regex: keyword, $options: 'i' } 
        });

        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// API 13: Get reports grouped by condition (stats API)
routers.get('/reportStats', async (req, res) => {
    try {
        const stats = await Report.aggregate([
            { $group: { _id: "$condition", count: { $sum: 1 } } }
        ]);

        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// API 14: Get the most reported health condition
routers.get('/mostReportedCondition', async (req, res) => {
    try {
        const mostReported = await Report.aggregate([
            { $group: { _id: "$condition", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        if (mostReported.length === 0) {
            return res.status(404).json({ error: "No reports found" });
        }

        res.json(mostReported[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// API 15: Check if a user has submitted a report today
routers.get('/hasReportedToday', handleusers, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const report = await Report.findOne({
            user: req.user._id,
            createdAt: { $gte: today }
        });

        res.json({ hasReported: !!report });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = routers;
