import { FC, useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import styles from "./MovieCarousel.module.css";
import { Movie } from "../../Interface/Movie";
import Slider from "../Slider/Slider";
import {
  globalGenreVar,
  getGlobalGenre,
  globalSortOrderVar,
} from "../../Clients/apolloClient";

const GET_MOVIES = gql`
  query GetMovies(
    $genres: [String]
    $sortOrder: String
    $search: String
    $offset: Int
    $amount: Int
  ) {
    getMovies(
      genres: $genres
      sortOrder: $sortOrder
      search: $search
      offset: $offset
      amount: $amount
    ) {
      movies {
        _id
        Poster_Link
        Released_Year
        Series_Title
      }
      totalPages
    }
  }
`;

interface carouselProps {
  genre: string;
  useGlobalState?: boolean;
}

const MovieCarousel: FC<carouselProps> = ({
  genre,
  useGlobalState = false,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [size, setSize] = useState(Math.floor(window.innerWidth / 250));

  // Uses global state if indicated, otherwise uses local props
  const currentGenre = useGlobalState ? getGlobalGenre() : genre;

  const { loading, error, data } = useQuery(GET_MOVIES, {
    variables: {
      genres: currentGenre ? [currentGenre] : [],
      sortOrder: globalSortOrderVar() ? globalSortOrderVar() : null,
      offset: 0,
      amount: size * 3,
    },
  });

  // Check localstorage for global variables
  useEffect(() => {
    const savedGenre = localStorage.getItem("selectedGenre");
    const savedSortOrder = localStorage.getItem("selectedSortOrder");

    if (savedGenre) {
      globalGenreVar(savedGenre);
    }

    if (savedSortOrder) {
      globalSortOrderVar(savedSortOrder);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setSize(Math.floor(window.innerWidth / 250));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (data) {
      console.log("fetching more");
      const fetchedMovies = data.getMovies.movies;
      console.log(fetchedMovies);
      setMovies([...fetchedMovies]);
    }
  }, [data]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <Link
        id={currentGenre + "Link"}
        className={styles.carouselTitle}
        to={"/project2/filter/" + currentGenre}
      >
        {`${currentGenre} ➥`}
        <div className={styles.hoverDetails}>view more</div>
      </Link>
      {!loading && <Slider movies={movies} size={size} />}
    </div>
  );
};

export default MovieCarousel;
