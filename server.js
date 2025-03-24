const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();

app.use(cors({origin: 'http://localhost:5173', methods: 'GET, POST, PUT, DELETE', allowedHeaders: 'Content-Type, Authorization', credentials: true}));
// app.use(cors({origin: '*', methods: 'GET, POST, PUT, DELETE', allowedHeaders: '*', credentials: true}));
app.use(express.json());

app.use(session({
    secret: 'dev-secret-key-1234',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production with HTTPS
  }));


// mongodb+srv://<username>:<password>@cluster0.mongodb.net/TaskManagement?retryWrites=true&w=majority
const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/TaskManagement';
mongoose.connect(db).then(() =>  console.log('Connected to MongoDB')).catch((err) => console.log('Error connecting to MongoDB:', err));

app.use('/api/tasks', taskRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})  
