import { useQuery, gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { Movie } from "../../Interface/Movie";
import styles from "./FilmView.module.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import ReviewForm from "../../components/ReviewForm/ReviewForm";
import ReviewDisplay from "../../components/ReviewDisplay/ReviewDisplay";
import { useEffect, useState } from "react";

// GraphQL query to fetch a movie by ID
const GET_MOVIE = gql`
  query GetMovie($ID: ID!) {
    getMovie(ID: $ID) {
      Series_Title
      Overview
      Genre
      IMDB_Rating
      Released_Year
      Poster_Link
    }
  }
`;
const FilmView = () => {
  const { id } = useParams(); // Get id from URL

  const navigate = useNavigate();

  // Fetch movie from GraphQL API
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { ID: id },
  });

  const [isFavorit, setIsFavorit] = useState(false);

  const [openReviewForm, setOpenReviewForm] = useState(false);

  // This useEffect will run whenever `favorite` changes

  useEffect(() => {
    const storedFavorite = localStorage.getItem("favorite");
    if (storedFavorite) {
      const array: string[] = JSON.parse(storedFavorite);
      if (id && array.includes(id)) {
        setIsFavorit(true);
      }
    }
  }, []);

  const handleAddFavorite = () => {
    const storedFavorite = localStorage.getItem("favorite");
    if (storedFavorite && id) {
      const array: string[] = JSON.parse(storedFavorite);
      setIsFavorit(true);
      array.push(id);
      localStorage.setItem("favorite", JSON.stringify(array));
    } else {
      localStorage.setItem("favorite", JSON.stringify([id]));
      setIsFavorit(true);
    }
  };
  const handleRemoveFavorite = () => {
    const storedFavorite = localStorage.getItem("favorite");
    if (storedFavorite && id) {
      const array: string[] = JSON.parse(storedFavorite);
      const newArray = array.filter((item) => item !== id);
      localStorage.setItem("favorite", JSON.stringify(newArray));
      setIsFavorit(false);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const movie: Movie = data.getMovie;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src={movie.Poster_Link}
            alt={movie.Series_Title}
            className={styles.image}
          />
          <button
            id="openFormButton"
            className={styles.addReviewButton}
            onClick={() => {
              setOpenReviewForm(true);
            }}
          >
            Create a Review
          </button>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.infoHeader}>
            <h1 id="header">{movie.Series_Title}</h1>

            <div className={styles.buttons}>
              {!isFavorit ? (
                <FaRegHeart
                  id="addFavorite"
                  className={styles.heartEmpty}
                  onClick={() => {
                    handleAddFavorite();
                  }}
                />
              ) : (
                <FaHeart
                  className={styles.heartRed}
                  onClick={() => {
                    handleRemoveFavorite();
                  }}
                />
              )}
              <button
                className={styles.backButton}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </button>
            </div>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.overview}>{movie.Overview}</p>
            <p className={styles.rating}>
              <b>Rating:</b> {movie.IMDB_Rating} / 10
            </p>
            <p className={styles.genre}>
              <b>Genre:</b> {movie.Genre?.join(", ")}
            </p>
            <p className={styles.released}>
              <b>Released:</b> {movie.Released_Year}{" "}
            </p>
          </div>
          <div className={styles.reviewContainer}>
            <h2>Reviews</h2>
            <ReviewDisplay />
          </div>
        </div>
      </div>
      {openReviewForm && <ReviewForm setOpenReviewForm={setOpenReviewForm} />}
    </>
  );
};

export default FilmView;
