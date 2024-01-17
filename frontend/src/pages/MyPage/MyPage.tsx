import styles from "./MyPage.module.css";

import GridView from "../../components/GridView/GridView";
import { useQuery, gql } from "@apollo/client";
const GET_MOVIES_WITH_IDS = gql`
  query GetMoviesWithIDs($IDs: [String!]) {
    getMoviesWithIDs(IDs: $IDs) {
      _id
      Series_Title
      Poster_Link
    }
  }
`;

const MyPage = () => {
  const storedFavorite = localStorage.getItem("favorite");

  const { loading, error, data } = useQuery(GET_MOVIES_WITH_IDS, {
    variables: {
      IDs: storedFavorite ? JSON.parse(storedFavorite) : [],
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <h2 style={{ marginBottom: "1rem" }}>My Favorite Movies</h2>
          <GridView movies={data.getMoviesWithIDs} />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
