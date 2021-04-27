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
  db.User.findOne({ firebaseID: req.params.id })
    .populate('movies')
    .then((dbUser) => {
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


  // .then(({ _id }) => {
  //   db.User.findOne({ firebaseID: req.params.id })
  //     // .populate('movies')
  //     .then((user) => {
  //       for (let i = 0; i < user.movies.length; i++) {
  //         const favorite = user.movies[i];
  //         console.log(favorite.imdbID, req.body.id)
  //         if (favorite.imdbID === req.body.id) {
  //           return res.end();
  //         }
  //       }
  //       db.User.findByIdAndDelete(req.params.id, (err, todo) => {
  //         // As always, handle any potential errors:
  //         if (err) return res.status(500).send(err);
  //         // We'll create a simple object to send back with a message and the id of the document that was removed
  //         // You can really do this however you want, though.
  //         const response = {
  //           message: "Movie successfully deleted",
  //           id: user.movies._id
  //         };
  //         return res.status(200).send(response);
  //       });

  // db.User.findByIdAndDelete(
  //   { firebaseID: req.params.id },
  //   { $splice.where ("movies") = _id },
  //   { new: true }
  // ).then((dbUser) => {
  //   res.json(dbUser);
  // }).catch((err) => {
  //   res.json(err);
  // })

  //     }).catch((err) => {
  //       res.json(err);
  //     })
  // })
});

module.exports = router;
