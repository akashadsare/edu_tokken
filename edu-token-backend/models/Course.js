// models/Course.js

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tokensEarned: { type: Number, required: true },
});

module.exports = mongoose.model('Course', CourseSchema);