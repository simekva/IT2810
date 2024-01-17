import { useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../Interface/Movie";
import styles from "./GridView.module.css";

interface GridItemProps {
  movie: Movie;
}
const GridItem: React.FC<GridItemProps> = ({ movie }) => {
  const [imageError, setImageError] = useState(false);

  const itemClass = imageError
    ? `${styles.imageContainer} ${styles.itemWithError}`
    : styles.imageContainer;

  //   const optimizedUrl = optimizeImageUrl(movie.Poster_Link);

  return (
    <>
      {console.log(movie.Series_Title)}
      <Link
        id={movie._id}
        data-testid={"test" + movie._id}
        key={`genre-view-item-${movie._id}`}
        className={styles.gridItem}
        to={"/project2/movie/" + movie._id}
      >
        <div className={itemClass}>
          {/* Display title and template image if image has error */}
          <img
            loading="lazy"
            decoding="async"
            src={imageError ? "/no_image_png.png" : movie.Poster_Link}
            alt="movie"
            className={styles.itemImg}
            onError={() => setImageError(true)}
          />
          {imageError && (
            <p className={styles.noImageTitle}>{movie.Series_Title}</p>
          )}
        </div>
      </Link>
    </>
  );
};

export default GridItem;
