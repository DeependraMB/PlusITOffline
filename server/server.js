const express = require('express');
const mongoose = require('mongoose');

const District = require('./Models/DistrictModel');
const Constituency = require('./Models/Constituency');
const Assembly = require('./Models/Assembly');

const indexRoutes = require('./Routes/indexRoutes')

const app = express();
const port = 8000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/PlusITOffline', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});


app.use("/api",indexRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });