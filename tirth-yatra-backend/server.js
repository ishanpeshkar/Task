require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const connectDB = require('./src/config/db.js');
const errorHandler = require('./src/middleware/errorMiddleware');


// Initialize Database
connectDB();

const app = express();



// Middleware
app.use(helmet()); // Sets security headers
app.use(cors());
app.use(express.json()); // Allows parsing of JSON bodies
app.use(xss()); // Prevents Cross-Site Scripting


// Rate limiting: prevent brute force/spam
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100 // limit each IP to 100 requests per window
});
app.use('/api', limiter); // Apply limiter only to API routes




// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/tirths', require('./src/routes/tirthRoutes'));



/* // Basic Health Check Route
app.get('/', (req, res) => {
  res.send('Jain Tirth Yatra API is running...');
}); */




// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});