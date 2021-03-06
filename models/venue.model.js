const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var venueSchema = new Schema({
    id: String,
    title:String,
    image: String,
    url: String,
    rating: Number,
    address: String,
    phone: String,
    price: String,
    totalAttending: { type: Number, default: 0 },
    usersAttending: [String]
});

var Venue = mongoose.model('venue', venueSchema);

module.exports = Venue;