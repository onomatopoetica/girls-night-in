const router = require("express").Router();
const db = require("../models");

router.get("/movies", (req, res) => {
    // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
    db.Movies.find({
    })
        .then(movies => res.json(movies))
        .catch(err => res.status(422).end());
});

module.exports = router;