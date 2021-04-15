const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Movies collection and inserts the movies below

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/reactGNImovies"
);

const moviesSeed = [
    {
        // result.title
        title: "Mean Girls",
        // result.poster
        poster: "",
        // date: new Date(Date.now())
    },
    {
        // result.title
        title: "Frankenstein",
        // result.poster
        poster: "",
        // date: new Date(Date.now())
    },
    {
        // result.title
        title: "The Great Gatsby",
        // result.poster
        poster: "",
        // date: new Date(Date.now())
    },
];

db.Movies
    .remove({})
    .then(() => db.Movies.collection.insertMany(moviesSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });