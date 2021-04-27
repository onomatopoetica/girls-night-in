const router = require("express").Router();
const db = require("../models");

router.get("/movies", (req, res) => {

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
  db.User.findOne({ firebaseID: req.params.id })
    .populate('movies')
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/movies/:id", (req, res) => {
  db.Movies.create({
    title: req.body.title,
    poster: req.body.poster,
    imdbID: req.body.id
  })
    .then(({ _id }) => {
      db.User.findOne({ firebaseID: req.params.id })
        .populate('movies')
        .then((user) => {
          for (let i = 0; i < user.movies.length; i++) {
            const favorite = user.movies[i];
            console.log(favorite.imdbID, req.body.id)
            if (favorite.imdbID === req.body.id) {
              return res.end();
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

router.delete("/movies/:id", (req, res) => {
  console.log(req.body, "body");
  db.Movies.findOne({ imdbID: req.body.id })
    .then(({ _id }) => {
      db.User.findOneAndUpdate(
        { firebaseID: req.params.id },
        { $pullAll: { movies: [_id] } },
        { new: true }
      ).then((dbUser) => {
        console.log(dbUser, "dbUser");
        db.Movies.deleteOne({
          imdbID: req.body.id
        }).then(() => {
          res.json(dbUser);
        }).catch((err) => {
          console.log(err);
          res.json(err);
        })

      }).catch((err) => {
        console.log(err);
        res.json(err);
      })
    })
});

module.exports = router;
