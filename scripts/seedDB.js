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
        // result.title
        Title: "Mean Girls",
        // result.poster
        Poster: "",
        // date: new Date(Date.now())
    },
    {
        // result.title
        Title: "Frankenstein",
        // result.poster
        Poster: "",
        // date: new Date(Date.now())
    },
    {
        // result.title
        Title: "The Great Gatsby",
        // result.poster
        Poster: "",
        // date: new Date(Date.now())
    },
];

db.Movies.collection.insertMany(moviesSeed)
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });