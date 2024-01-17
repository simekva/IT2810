import { Movie } from "../../Interface/Movie";
import styles from "./GridView.module.css";
import GridItem from "./GridItem";

interface GridViewProps {
  movies: Movie[];
}
const GridView: React.FC<GridViewProps> = ({ movies }) => {
  return (
    <>
      <div className={styles.gridContainer}>
        {movies.map((movie) => (
          <GridItem key={movie._id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default GridView;
