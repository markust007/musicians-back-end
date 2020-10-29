const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MusicianSchema = new Schema({
  name: String,
  band: String,
  instrument: String
});

mongoose.model('Musician', MusicianSchema);
