// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Web3 = require('web3').default;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/edu-token', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Connect to Ganache
const web3 = new Web3('http://127.0.0.1:7545');

// Import User model
const User = require('./models/User');

// Sample route to check server status
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// User Registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ username, password: hashedPassword });
    
    try {
        await user.save();
        res.status(201).send('User registered successfully!');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    
    res.json({ token });
});

// Middleware to authenticate JWT
function authenticateJWT(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    if (!token) return res.sendStatus(403);
    
    jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Example route protected by JWT
app.get('/profile', authenticateJWT, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ username: user.username, tokens: user.tokens, completedCourses: user.completedCourses });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// Import Course model
const Course = require('./models/Course');

// Create a new course
app.post('/courses', authenticateJWT, async (req, res) => {
    const { name, tokensEarned } = req.body;

    const course = new Course({ name, tokensEarned });

    try {
        await course.save();
        res.status(201).send('Course created successfully!');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Complete a course and reward tokens
app.post('/complete-course', authenticateJWT, async (req, res) => {
    const { courseId } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).send('Course not found');

        // Update user's token balance
        const user = await User.findById(req.user.id);
        user.tokens += course.tokensEarned;
        user.completedCourses.push(course.name);
        
        await user.save();
        
        res.send(`Course completed! You earned ${course.tokensEarned} tokens.`);
    } catch (error) {
        res.status(400).send(error.message);
    }
});



