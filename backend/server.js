const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Local MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // allows frontend to ping us

// Import Routes
const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const pathwayRoutes = require('./routes/pathwayRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/pathway', pathwayRoutes);

app.get('/', (req, res) => {
    res.send('Calmiq Fusion Engine API is Live...');
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Routing is working' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
