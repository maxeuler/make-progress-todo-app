const mongoose = require('mongoose');

const connectToDB = url =>
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

mongoose.connection.on('connected', () => {
  console.log('🚀 🚀  connected to mongo');
});

module.exports = connectToDB;
