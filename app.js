const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registrationDB');

// Define User model
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    const newUser = new User({ name, email, password });
    
    try {
        await newUser.save();
        res.send('User registered successfully');
    } catch (err) {
        res.send('Error registering user');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
