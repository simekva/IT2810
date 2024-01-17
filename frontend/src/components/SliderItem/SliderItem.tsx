import { useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../Interface/Movie";
import styles from "./SliderItem.module.css";

interface CarouselItemProps {
  movie: Movie;
  tabIndex: number;
  width: number;
}
const CarouselItem: React.FC<CarouselItemProps> = ({
  movie,
  tabIndex,
  width,
}) => {
  const [imageError, setImageError] = useState(false);

  const itemClass = imageError
    ? `${styles.imageContainer} ${styles.itemWithError}`
    : styles.imageContainer;

  return (
    <Link
      key={`carousel-item-${movie._id}`}
      id={movie._id}
      className={styles.item}
      to={"/project2/movie/" + movie._id}
      tabIndex={tabIndex}
      style={{ width: width + "%" }}
    >
      <div className={itemClass}>
        {/* Display title and template image if image has error */}
        <img
          loading="lazy"
          decoding="async"
          src={imageError ? "/no_image_png.png" : movie.Poster_Link}
          alt={"movie"}
          data-testid={"test" + movie._id}
          className={styles.itemImg}
          onError={() => setImageError(true)}
        />
        {imageError && (
          <p className={styles.noImageTitle}>{movie.Series_Title}</p>
        )}
      </div>
    </Link>
  );
};

export default CarouselItem;
