const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var venueSchema = new Schema({
    id: String,
    title:String,
    link:String,
    image:String,
    snippet:String,
    totalAttending: { type: Number, default: 0 },
    usersAttending: [String]
});

var Venue = mongoose.model('venue', venueSchema);

module.exports = Venue;