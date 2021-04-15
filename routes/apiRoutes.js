const router = require("express").Router();
const db = require("../models");

router.get("/movies", (req, res) => {
    // Use a regular expression to search titles for req.query.q
    // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
    db.Movies.find({
        // ******* ????? *******
        // title: { $regex: new RegExp(req.query.q, 'i') }
    })
        .then(movies => res.json(movies))
        .catch(err => res.status(422).end());
});

module.exports = router;