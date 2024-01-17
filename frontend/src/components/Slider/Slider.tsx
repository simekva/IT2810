import { FC, useEffect, useState } from "react";

import styles from "./Slider.module.css";
import { Movie } from "../../Interface/Movie";
import SliderItem from "../SliderItem/SliderItem";

interface carouselProps {
  movies: Movie[];
  size: number;
}

const Carousel: FC<carouselProps> = (props) => {
  const [offset, setOffset] = useState(-100);
  const [page, setPage] = useState(1);
  const [sliding, setSliding] = useState(false);

  //handles next items in carousel
  const handleNext = () => {
    if (!sliding) {
      setSliding(true);
      setOffset(-200);

      const timer = setTimeout(() => {
        setSliding(false);
        setOffset(-100);
        setPage(page == 3 ? 1 : page + 1);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  };

  useEffect(() => {
    console.log(page);
  }, [page]);

  //handles prev items in carousel
  const handlePrev = () => {
    if (!sliding) {
      setSliding(true);
      setOffset(0);

      const timer = setTimeout(() => {
        setSliding(false);
        setOffset(-100);
        setPage(page == 1 ? 3 : page - 1);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  };

  return (
    <div className={styles.container}>
      <button
        data-testid="carousel-prev"
        className={styles.arrowLeft}
        onClick={handlePrev}
      ></button>
      <div
        className={styles.slider}
        style={{
          transform: "translateX(" + offset + "%)",
          transition: sliding ? "all ease-in 0.5s" : "all ease-in 0s",
        }}
      >
        <div
          className={styles.slide}
          style={{
            order: page === 1 ? 1 : page === 2 ? 3 : 2,
          }}
        >
          {props.movies
            .slice(props.size * 2, props.size * 3)
            .map((movie, index) => (
              <SliderItem
                key={index}
                movie={movie}
                tabIndex={page === 3 ? 0 : -1}
                width={100 / props.size}
              />
            ))}
        </div>
        <div
          className={styles.slide}
          style={{
            order: page === 1 ? 2 : page === 2 ? 1 : 3,
          }}
        >
          {props.movies.slice(0, props.size).map((movie, index) => (
            <SliderItem
              key={index}
              movie={movie}
              tabIndex={page === 1 ? 0 : -1}
              width={100 / props.size}
            />
          ))}
        </div>
        <div
          className={styles.slide}
          style={{
            order: page === 1 ? 3 : page === 2 ? 2 : 1,
          }}
        >
          {props.movies
            .slice(props.size, props.size * 2)
            .map((movie, index) => (
              <SliderItem
                key={index}
                movie={movie}
                tabIndex={page === 2 ? 0 : -1}
                width={100 / props.size}
              />
            ))}
        </div>
      </div>
      <button
        data-testid="carousel-next"
        className={styles.arrowRight}
        onClick={handleNext}
      ></button>
    </div>
  );
};

export default Carousel;
