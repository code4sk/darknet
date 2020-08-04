const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const personSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true,
        unique: true
    },
})

const genreSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true,
        unique: true
    },
});

const seriesIDSchema = new mongoose.Schema({
    id: {
        type: 'String',
        required: true,
        unique: true
    }
});


const seriesSchema = new mongoose.Schema({ 
    seriesID: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'SeriesID' }
    ],
    name: {
        type: 'String',
        required: true,
    },
    description:{
        type: 'String',
        required: true
    },
    isMovie: {
        type: 'Boolean',
        required: true
    },
    imbd: {
        type: 'Number',
        required: true,
        max: 10
    },
    rottenTomatoes: {
        type: 'Number',
        max: 100
    },
    genre: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }
    ],
    cast: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Person' }
    ],
    director: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Person' }
    ],
})

const episodeSchema = new mongoose.Schema({
    number: {
        type: 'Number',
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    name: {
        type: 'String',
        required: true,
    },
    description: {
        type: 'String'
    },
    series: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Series' }
    ],
});

episodeSchema.index({ name: 1, series: 1 }, { unique: true });


const Series = mongoose.model('Series', seriesSchema);
const Episode = mongoose.model('Episode', episodeSchema);
const Genre = mongoose.model('Genre', genreSchema);
const Person = mongoose.model('Person', personSchema);
const SeriesID = mongoose.model('SeriesID', seriesIDSchema)

module.exports = {
    Series,
    Episode,
    Genre,
    Person,
    SeriesID,
}

