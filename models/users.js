const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
      type: String,
      unique: true
    },
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movies"
      }
    ],
    firebaseID: {
        type: String,
        unique: true
    }
  });

const User = mongoose.model("User", UserSchema);

module.exports = User;