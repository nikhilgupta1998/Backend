const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

// Connect to the MongoDB database
const dbUrl = process.env.DATABASE_URL;
mongoose.connect(dbUrl)
.then(()=>console.log("Database connected"))
.catch((error)=>console.log(error));
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Load routes
const userRoutes = require('./routes/userRoutes');
const blogPostRoutes = require('./routes/blogPostRoutes');

// Register routes
app.use('/api/users', userRoutes);
app.use('/api/posts', blogPostRoutes);
app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
