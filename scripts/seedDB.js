const mongoose = require("mongoose");
const db = require("../models");
const dotenv = require("dotenv")
dotenv.config()

// This file empties the Movies collection and inserts the movies below

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }
);

const moviesSeed = [
    {
        Title: "Mean Girls",
        Poster: "",
    },
    {
        Title: "Frankenstein",
        Poster: "",
    },
    {
        Title: "The Great Gatsby",
        Poster: "",
    },
];

db.Movies.collection.insertMany(moviesSeed)
    .then(data => {
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });