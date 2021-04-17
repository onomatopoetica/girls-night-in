const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    title: { type: String },
    poster: { type: String },
});

const Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;