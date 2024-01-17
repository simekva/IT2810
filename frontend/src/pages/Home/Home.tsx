import { useEffect, useState } from "react";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className={styles.homeNav}>
        <Link to={"/project2/filter/Romance"}>Romance</Link>
        <Link to={"/project2/filter/Action"}>Action</Link>
        <Link to={"/project2/project2/filter/Animation"}>Animation</Link>
        <Link to={"/project2/filter/Family"}>Family</Link>
        <Link to={"/project2/filter/Comedy"}>Comedy</Link>
        <Link to={"/project2/filter/Thriller"}>Thriller</Link>
      </div>

      <MovieCarousel genre={"Action"} useGlobalState={true} />

      <MovieCarousel genre={"Comedy"} />

      <MovieCarousel genre={"Romance"} />

      <MovieCarousel genre={"Animation"} />

      <MovieCarousel genre={"Thriller"} />

      <MovieCarousel genre={"Family"} />

      {showScrollButton && (
        <button
          id="scrollTopButton"
          className={styles.scrollTopButton}
          onClick={scrollToTop}
        >
          Scroll to Top
        </button>
      )}
    </div>
  );
};

export default Home;
