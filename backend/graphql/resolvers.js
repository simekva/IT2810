const Movie = require("../models/Movie");

const Review = require("../models/Review");

module.exports = {
  Query: {
    async getMovie(_, { ID }) {
      return await Movie.findById(ID);
    },

    async getMoviesWithIDs(_, { IDs }) {
      return await Movie.find({ 
        _id: { $in: IDs } 
      });
    },
    async getMovies(_, { genres, sortOrder, search, offset, amount }) {
      const query = {};
      if (genres && genres.length > 0) {
        query.Genre = { $in: genres };
      }
      if (search) {
        const regex = new RegExp(search, "i");
        query.Series_Title = { $regex: regex };
      }
      let sortOptions = {};
      if (sortOrder) {
        if (sortOrder === "asc") {
          sortOptions = { Series_Title: 1 };
        } else if (sortOrder === "desc") {
          sortOptions = { Series_Title: -1 };
        } else if (sortOrder === "Hrating") {
          sortOptions = { IMDB_Rating: -1 };
        } else if (sortOrder === "Lrating") {
          sortOptions = { IMDB_Rating: 1 };
        } else if (sortOrder === "dateDesc") {
          sortOptions = { Released_Year: -1 };
        } else if (sortOrder === "dateAsc") {
          sortOptions = { Released_Year: 1 };
        }
      }
      const movies = await Movie.find(query)
        .sort(sortOptions)
        .skip(offset * amount)
        .limit(amount);

      const totalCount = await Movie.countDocuments(query);
      const totalPages = amount > 0 ? Math.ceil(totalCount / amount) : 0;

      return {
        movies,
        totalPages,
      };
    },

    async searchMovies(_, { title }) {
      return await Movie.find({
        Series_Title: { $regex: title, $options: "i" },
      }).limit(10);
    },

    async getReviews(_, { movieId , offset, amount,  }) {
      return await Review.find({ movieId: movieId }).skip(offset * amount).limit(amount).exec();
    },
  },
  Mutation: {
    async addReview(_, { name, rating, text, movieId }) {
      const newReview = new Review({
        name,
        rating,
        text,
        movieId: movieId,
      });
      await newReview.save();
      return newReview;
    },
  },
  //   Mutation: {
  //     async addMovie(
  //       _,
  //       {
  //         movieInput: {
  //           title,
  //           description,
  //           director,
  //           genre,
  //           releaseYear,
  //           rating,
  //           image,
  //         },
  //       }
  //     ) {
  //       const addedMovie = new Movie({
  //         title: title,
  //         description: description,
  //         director: director,
  //         genre: genre,
  //         releaseYear: releaseYear,
  //         rating: rating,
  //         image: image,
  //         // imageURL: imageURL,
  //       });

  //       const res = await addedMovie.save(); //MongoDB Saving

  //       return {
  //         id: res.id,
  //         ...res._doc,
  //       };
  //     },
  //     async deleteMovie(_, { ID }) {
  //       const wasDeleted = (await Movie.deleteOne({ _id: ID })).deletedCount;
  //       return wasDeleted; // 1 if something was deleted, 0 if not
  //     },
  //     async editMovie(
  //       _,
  //       {
  //         ID,
  //         movieInput: {
  //           title,
  //           rating,
  //           description,
  //           director,
  //           genre,
  //           releaseYear,
  //           image,
  //         },
  //       }
  //     ) {
  //       const wasEdited = (
  //         await Movie.updateOne(
  //           { _id: ID },
  //           {
  //             title: title,
  //             rating: rating,
  //             description: description,
  //             director: director,
  //             genre,
  //             releaseYear,
  //             image,
  //           }
  //         )
  //       ).modifiedCount;
  //       return wasEdited; // 1 if something was edited, 0 if nothing was edited
  //     },
  //   },
  //
};
