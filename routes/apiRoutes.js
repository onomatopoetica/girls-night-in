const router = require("express").Router();
const db = require("../models");

router.get("/movies", (req, res) => {
  // using case insensitive match. https://docs.mongodb.com/manual/reference/operator/query/regex/index.html
  db.Movies.find({})
    .then((movies) => res.json(movies))
    .catch((err) => res.status(422).end());
});

router.post("/movies", (req, res) => {
  db.Movies.create({
    title: req.body.title,
    poster: req.body.poster,
  })
    .then(({ _id }) => {
      
          return db.User.findOneAndUpdate(
            { firebaseID: req.body.firebaseID },
            { $push: { movies: _id } },
            { new: true }
          ).then((dbUser) => {
            res.json(dbUser);
          })
          .catch((err) => {
            res.json(err);
          });
       
        
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/user", (req, res) => {
  db.User.create({
    name: req.body.name,
    firebaseID: req.body.firebaseID,
  })
    .then((dbUser) => {
      console.log(dbUser);
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/user/:id", (req, res) => {
  console.log(req.params);
  db.User.findOne({ firebaseID: req.params.id })
    .populate('movies')
    .then((dbUser) => {
      console.log(dbUser);
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

//4/24 post route for favorites attempt
router.post("/movies/:id", (req, res) => {
  db.Movies.create({
    title: req.body.title,
    poster: req.body.poster,
  })
    .then(({ _id }) => {
      db.User.findOne({ firebaseID: req.params.id })
      .then((user) => {
        console.log(req.body, user);
        for (let i = 0; i < user.movies.length; i++) {
          const favorite = user.movies[i];
          if (favorite === req.body.id) {
            res.end();
          }
        }
        db.User.findOneAndUpdate(
          { firebaseID: req.params.id },
          { $push: { movies: _id } },
          { new: true }
        ).then((dbUser) => {
          res.json(dbUser);
        }).catch((err) => {
          res.json(err);
        })
        
      }).catch((err) => {
        res.json(err);
      })
  })
});

module.exports = router;
