const { gql } = require("apollo-server");
module.exports = gql`
  type Movie {
    _id: ID!
    Poster_Link: String
    Series_Title: String
    Released_Year: Int
    Certificate: String
    Runtime: String
    Genre: [String]
    IMDB_Rating: Float
    Overview: String
    Meta_score: Int
    Director: String
    Star1: String
    Star2: String
    Star3: String
    Star4: String
    No_of_Votes: Int
    Gross: String
  }

  type FavoriteMovie {
    _id: ID!
    movieId: Movie!
  }

  type Review {
    _id: ID!
    name: String!
    rating: Int!
    text: String!
    movieId: Movie!
  }
  type MoviesResponse {
    movies: [Movie]
    totalPages: Int
  }
  type Query {
    getMoviesWithIDs(IDs: [String!]): [Movie]
    getMovie(ID: ID!): Movie!
    getMovies(
      genres: [String]
      sortOrder: String
      search: String
      offset: Int
      amount: Int
    ): MoviesResponse
    searchMovies(title: String): [Movie]
    getReviews(movieId: ID!, offset: Int, amount: Int): [Review]
  }

  type Mutation {
    addReview(name: String!, rating: Int!, text: String!, movieId: ID!): Review

    # addMovie(movieInput: MovieInput): Movie!
    # deleteMovie(ID: ID!): Boolean
    # editMovie(ID: ID!, movieInput: MovieInput): Boolean
  }
  # input MovieInput {
  #   seriesTitle: String
  #   overview: String
  #   imdbRating: Int
  #   genre: [String]
  #   director: String
  #   releasedYear: Int
  #   posterLink: String
  # }

  #   input RateMovie {
  #     rating: Int
  #   }
`;
