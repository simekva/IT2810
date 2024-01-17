import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Define an array of mock movies for use in tests
export const mockMovies = [
  {
    _id: "123",
    Poster_Link: "http://example.com/poster1.jpg",
    Series_Title: "Test Movie 1",
    Released_Year: 2022,
    Certificate: "PG-13",
    Runtime: "2h 30min",
    Genre: ["Action", "Adventure", "Sci-Fi"],
    IMDB_Rating: 8.5,
    Overview: "A thrilling test movie overview.",
    Meta_score: 85,
    Director: "John Doe",
    Star1: "Actor 1",
    Star2: "Actor 2",
    Star3: "Actor 3",
    Star4: "Actor 4",
    No_of_Votes: 1000,
    Gross: "$100 million",
  },
  {
    _id: "456",
    Poster_Link: "http://example.com/poster2.jpg",
    Series_Title: "Test Movie 2",
    Released_Year: 2023,
    Certificate: "R",
    Runtime: "2h 45min",
    Genre: ["Drama", "Mystery"],
    IMDB_Rating: 7.8,
    Overview: "Another exciting test movie overview.",
    Meta_score: 80,
    Director: "Jane Doe",
    Star1: "Actor A",
    Star2: "Actor B",
    Star3: "Actor C",
    Star4: "Actor D",
    No_of_Votes: 800,
    Gross: "$80 million",
  },
  {
    _id: "789",
    Poster_Link: "http://example.com/poster3.jpg",
    Series_Title: "Test Movie 3",
    Released_Year: 2021,
    Certificate: "PG",
    Runtime: "2h 15min",
    Genre: ["Comedy"],
    IMDB_Rating: 6.5,
    Overview: "A humorous test movie overview.",
    Meta_score: 70,
    Director: "James Smith",
    Star1: "Actor X",
    Star2: "Actor Y",
    Star3: "Actor Z",
    Star4: "Actor W",
    No_of_Votes: 1200,
    Gross: "$120 million",
  },
];

// Cleanup after each test
afterEach(() => {
  cleanup();
});
