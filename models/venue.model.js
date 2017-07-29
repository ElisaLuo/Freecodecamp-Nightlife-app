const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var venueSchema = new Schema({
    id: {type:String, unique: true},
    title:String,
    image: String,
    url: String,
    rating: Number,
    address: String,
    totalAttending: { type: Number, default: 0 },
    usersAttending: [String]
});

var Venue = mongoose.model('venue', venueSchema);

module.exports = Venue;