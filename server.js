const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>  console.log('Connected to MongoDB')).catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
