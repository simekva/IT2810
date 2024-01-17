import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import debounce from "lodash/debounce";
import { Movie } from "../../Interface/Movie";

import { BsSearchHeart } from "react-icons/bs";

const SEARCH_MOVIES_QUERY = gql`
  query SearchMovies($title: String!) {
    searchMovies(title: $title) {
      _id
      Series_Title
    }
  }
`;

interface searchProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Search: FC<searchProps> = (props) => {
  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(SEARCH_MOVIES_QUERY, {
    variables: { title: query },
    skip: !query, // Skip the query if query is empty
  });

  // Debounce to limit queries
  const debouncedSetQuery = debounce((value) => {
    setQuery(value);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist(); // persist the event since we are debouncing
    debouncedSetQuery(e.target.value);
  };

  //hides search results when clicking outside of the search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      const searchInput = document.querySelector(`.${styles.searchInput}`);
      const searchResults = document.querySelector(`.${styles.searchResults}`);

      if (
        searchInput &&
        searchResults &&
        !searchInput.contains(target) &&
        !searchResults.contains(target)
      ) {
        setShowResults(false);
        props.setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOnClick = (movie: Movie) => {
    props.setOpen(false);
    navigate(`/project2/movie/${movie._id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/project2/filter/all?search=${query}`);
      props.setOpen(false);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputContainer}>
        <input
          data-testid="search-field"
          id="searchField"
          className={styles.searchInput}
          onChange={handleSearchChange}
          onFocus={() => setShowResults(true)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search movies..."
        />

        <BsSearchHeart className={styles.searchButton} />
      </div>

      <div className={styles.searchResults}>
        {loading && <p className={styles.loading}>Loading...</p>}
        {error && <p className={styles.error}>Error: {error.message}</p>}
        {showResults && data && (
          <>
            {data.searchMovies.map((movie: Movie) => (
              <div
                id={"searchResult_" + movie._id}
                key={movie._id}
                onClick={() => handleOnClick(movie)}
              >
                {movie.Series_Title}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
