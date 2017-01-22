const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// SCHEMA NAMES MUST BE IN PascalCase
module.exports = {
    Person: {
        firstName: String,
        lastName: String,
        gender: String,
        title: String,
        relation: String,
        description: String,
        levels: {

        },
        tags: { type: [String], default: [] }
    },
    Contemplation: {
        _personId: Schema.Types.ObjectId,
        _eventId: Schema.Types.ObjectId,
        date: { type: Date, default: Date.now },
        title: String,
        text: String
    },
    Event: {
        date: { type: Date, default: Date.now },
        title: String,
        location: String
    }
};