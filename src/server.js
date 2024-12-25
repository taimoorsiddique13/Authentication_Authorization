const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const path = require("path");
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.static("public"));


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 30000, 
    httpOnly: true
  }
}));

mongoose.connect('mongodb://localhost:27017/authdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const checkSession = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Please login to continue' });
  }
  next();
};

app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});