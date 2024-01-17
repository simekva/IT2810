const { model, Schema } = require("mongoose");

const reviewSchema = new Schema({
  name: String,
  rating: Number,
  text: String,
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
  },
});

module.exports = model("Review", reviewSchema);
