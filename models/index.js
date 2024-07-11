require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const commentRoutes = require('./routes/commentRoutes');


const app = express();

app.use('/' , commentRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); 
});

module.exports.Place = require('./places')
module.exports.Comment = require('./comment')

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
