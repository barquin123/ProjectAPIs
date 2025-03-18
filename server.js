const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());
// mongodb+srv://<username>:<password>@cluster0.mongodb.net/TaskManagement?retryWrites=true&w=majority
const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/TaskManagement';
mongoose.connect(db).then(() =>  console.log('Connected to MongoDB')).catch((err) => console.log('Error connecting to MongoDB:', err));

app.use('/api/tasks', taskRoutes); 
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})  
