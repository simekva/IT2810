const { model, Schema } = require("mongoose");

const favoriteMovieSchema = new Schema({
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
});

const favoriteMovie = model("FavoriteMovie", favoriteMovieSchema);
module.exports = favoriteMovie;
