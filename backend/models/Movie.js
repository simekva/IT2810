const { model, Schema } = require("mongoose");

const movieSchema = new Schema({
  _id: Schema.Types.ObjectId,
  Poster_Link: String,
  Series_Title: {
    type: String,
    index: true,
  },
  Released_Year: Number,
  Certificate: String,
  Runtime: String,
  Genre: [String],
  IMDB_Rating: Number,
  Overview: String,
  Meta_score: Number,
  Director: String,
  Star1: String,
  Star2: String,
  Star3: String,
  Star4: String,
  No_of_Votes: Number,
  Gross: String,
});

movieSchema.index({ Series_Title: "text" });

const Movie = model("Movie", movieSchema, "movieeees");

// Create index for search functionality
Movie.createIndexes()
  .then(() => {
    console.log("Index created successfully");
  })
  .catch((error) => {
    console.error("Index creation failed:", error);
  });

module.exports = Movie;
