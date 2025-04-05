require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const authProtected = require('./routes/protected');

const app = express();

app.use(cors());
app.use(express.json());

connectDB()

app.use('/api/auth', authRoutes);
app.use('/api/protected', authProtected);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App start listen at port : ${PORT}`);
})