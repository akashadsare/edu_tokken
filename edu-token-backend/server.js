const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Web3 } = require('web3');  // Updated import
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/edu-token', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err.message);
});

// Connect to QuickNode
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.QUICKNODE_HTTP_ENDPOINT));

// Import models
const User = require('./models/User');
const Course = require('./models/Course');

// Sample route to check server status
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// User Registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({
            message: `Registration successful! Welcome, ${username}!`, // Success message
        });
    } catch (error) {
        res.status(400).send('Error registering user: ' + error.message);
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send('Error logging in: ' + error.message);
    }
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
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User  not found');
        res.json({ username: user.username, tokens: user.tokens, completedCourses: user.completedCourses });
    } catch (error) {
        res.status(500).send('Error fetching user profile: ' + error.message);
    }
});

// Create a new course
app.post('/courses', authenticateJWT, async (req, res) => {
    const { name, tokensEarned } = req.body;

    const course = new Course({ name, tokensEarned });

    try {
        await course.save();
        res.status(201).send('Course created successfully!');
    } catch (error) {
        res.status(400).send('Error creating course: ' + error.message);
    }
});

// Complete a course and reward tokens
app.post('/complete-course', authenticateJWT, async (req, res) => {
    const { courseId } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).send('Course not found');

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User not found');

        user.tokens += course.tokensEarned;
        user.completedCourses.push(courseId);
        await user.save();

        res.json({ message: 'Course completed successfully!' });
    } catch (error) {
        res.status(500).send('Error completing course: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});