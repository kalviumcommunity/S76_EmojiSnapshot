const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Ping endpoint
app.get('/ping', (req, res) => {
  try {
    // Simulate a successful response
    res.status(200).json({ message: 'pong' });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error in /ping endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err.message);
  process.exit(1); // Exit the process if the server fails to start
});
