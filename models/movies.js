const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const moviesSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     // url string for thumbnail image
//     thumbnail: {
//         type: String,
//         default: ""
//     },
//     // url for OMDB?
//     href: {
//         type: String,
//         default: "",
//         unique: true
//     },

//     // Movie plot
//     // from which seed data was sourced ????
//     plot: [String]
// });

const moviesSchema = new Schema({
    title: { type: String },
    description: { type: String },
    poster: { type: String },
    // date: { type: Date, default: Date.now },
});

const Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;