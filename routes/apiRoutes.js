const router = require("express").Router();
const db = require("../models");

router.get("/movies", (req, res) => {
    // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
    db.Movies.find({
    })
        .then(movies => res.json(movies))
        .catch(err => res.status(422).end());
});

router.post("/movies", (req,res) => {
    db.Movies.create({
        title: req.body.title,
        poster: req.body.poster
    })
    .then(({ _id }) => db.User.findOneAndUpdate({firebaseID:req.body.firebaseID}, { $push: { movies: _id } }, { new: true }))
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/user", (req,res) => {
    db.User.create({
        name: req.body.name,
        firebaseID: req.body.firebaseID
    })
    .then(dbUser => {
        console.log(dbUser);
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
})

router.get("/user/:id", (req,res) => {
    db.User.find({firebaseID:req.params.id})
    .populate("movies")
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
})


//4/24 post route for favorites attempt
router.post("/movies/:id", (req,res) => {
  db.Movies.create({
    title: req.body.title,
    poster: req.body.poster
})
.then(({ _id }) => db.User.findOneAndUpdate({firebaseID:req.params.id}, { $push: { movies: _id } }, { new: true }))
.then(dbUser => {
  res.json(dbUser);
})
.catch(err => {
  res.json(err);
});
})

module.exports = router;