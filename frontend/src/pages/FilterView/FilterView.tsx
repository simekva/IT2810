import { useNavigate, useParams } from "react-router-dom";
import styles from "./FilterView.module.css";
import { genres } from "../Home/Genres";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { Movie } from "../../Interface/Movie";
import Pagination from "../../components/Pagination/Pagination";
import { useLocation } from "react-router-dom";
import GridView from "../../components/GridView/GridView";
import { globalGenreVar, globalSortOrderVar } from "../../Clients/apolloClient";

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
        Series_Title
        Poster_Link
      }
      totalPages
    }
  }
`;

const FilterView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlSortOrder = queryParams.get("sort");
  const [sortOrder, setSortOrder] = useState<string | null>(urlSortOrder);
  const initialGenre = id !== "all" ? id : null;
  const [genre, setGenre] = useState<string | null>(initialGenre || null);
  const searchQuery = queryParams.get("search");

  const { loading, error, data } = useQuery(GET_MOVIES, {
    variables: {
      genres: genre ? [genre] : [],
      amount: itemsPerPage,
      sortOrder: sortOrder,
      search: searchQuery,
      offset: currentPage - 1,
    },
  });

  // Check localstorage for global variables, if no search query
  useEffect(() => {
    if (!searchQuery) {
      const savedGenre = localStorage.getItem("selectedGenre");
      const savedSortOrder = localStorage.getItem("selectedSortOrder");

      if (savedGenre) {
        setGenre(savedGenre);
        globalGenreVar(savedGenre);
      }

      if (savedSortOrder) {
        setSortOrder(savedSortOrder);
        globalSortOrderVar(savedSortOrder);
      }
    } else {
      // Clear genre and sortOrder if there's a search query
      setGenre(null);
      setSortOrder(null);
    }
  }, [searchQuery]);

  // Updates localstorage and global variables when genre or sortorder changes
  useEffect(() => {
    if (genre !== null) {
      localStorage.setItem("selectedGenre", genre);
      globalGenreVar(genre);
    } else {
      localStorage.removeItem("selectedGenre");
      globalGenreVar(null);
    }
  }, [genre]);

  useEffect(() => {
    if (sortOrder !== null) {
      localStorage.setItem("selectedSortOrder", sortOrder);
      globalSortOrderVar(sortOrder);
    } else {
      localStorage.removeItem("selectedSortOrder");
      globalSortOrderVar(null);
    }
  }, [sortOrder]);

  // Updates url to reflect chosen genre, remembers on refresh
  useEffect(() => {
    if (!searchQuery) {
      const url = `/project2/filter/${genre || "all"}`;
      const queryParams = new URLSearchParams();

      if (sortOrder) {
        queryParams.set("sort", sortOrder);
      }

      navigate(`${url}?${queryParams.toString()}`);
      setCurrentPage(1);
    }
  }, [genre, sortOrder, navigate, searchQuery]);

  //Refetches if data in useQuery changes
  useEffect(() => {
    console.log("data changed");
    if (data) {
      const fetchedMovies = data.getMovies.movies;
      const totalPages = data.getMovies.totalPages;
      setMovies(fetchedMovies);
      setTotalPages(totalPages);
      console.log(fetchedMovies);
      console.log(totalPages);
    }
  }, [data]);

  const resetFilters = () => {
    setGenre(null);
    setSortOrder(null);

    navigate("/project2/filter/all");
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.selectGroup}>
          <select
            className={styles.titleSelect}
            value={genre ? genre : ""}
            id="genreSelect"
            onChange={(e) => {
              if (e.target.value === "Genres") {
                setGenre(null);
              } else {
                setGenre(e.target.value);
              }
            }}
          >
            <option value="Genres">Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            className={styles.sortButton}
            value={sortOrder ? sortOrder : ""}
            onChange={(e) => {
              if (e.target.value === "SortOn") {
                setSortOrder(null);
              } else {
                setSortOrder(e.target.value);
              }
            }}
          >
            <option value="SortOn">Sort on...</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
            <option value="Hrating">Highest rating</option>
            <option value="Lrating">Lowest rating</option>
            <option value="dateDesc">Newest</option>
            <option value="dateAsc">Oldest</option>
          </select>
          <button className={styles.rmFilters} onClick={resetFilters}>
            Remove filters
          </button>
        </div>
        <button
          id="backButton"
          className={styles.backButton}
          onClick={() => {
            navigate("/project2/");
          }}
        >
          Go back
        </button>
      </div>

      {!loading && !error ? (
        <>
          <GridView movies={movies} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <>
          {loading && <p>Loading...</p>}

          {error && <p>Error</p>}
        </>
      )}
    </div>
  );
};

export default FilterView;
export { GET_MOVIES };
