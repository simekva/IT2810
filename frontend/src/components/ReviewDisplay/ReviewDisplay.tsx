import { useEffect, useState } from "react";
import styles from "./ReviewDisplay.module.css";
import { BsStarFill } from "react-icons/bs";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_REVIEWS = gql`
  query GetReviews($movieId: ID!, $offset: Int, $amount: Int) {
    getReviews(movieId: $movieId, offset: $offset, amount: $amount) {
      name
      text
      rating
    }
  }
`;
interface Review {
  name: string;
  rating: number;
  text: string;
  id: string;
}

const ReviewDisplay = () => {
  const { id } = useParams(); // Get id from URL

  const [reviews, setReviews] = useState<Review[]>([]);
  const [max, setMax] = useState(false);

  const [offset, setOffset] = useState(0);

  const { loading, error, data } = useQuery(GET_REVIEWS, {
    variables: { movieId: id, offset: offset, amount: 4 },
  });

  useEffect(() => {
    if (data) {
      const fetchedReviews = data.getReviews;
      if (fetchedReviews.length == 0) {
        setMax(true);
      }
      setReviews([...reviews, ...fetchedReviews]);
    }
  }, [data]);

  const handleLoadMore = () => {
    if (reviews && !loading) {
      setOffset(offset + 1);
    }
  };

  return (
    <div className={styles.container}>
      {loading && reviews.length >= 0 && <p>Loading reviews...</p>}
      {error && <p>Error loading reviews. Please try again.</p>}
      {reviews.map((review, index) => (
        <div className={styles.reviewContainer} key={`review-${index}`}>
          <div className={styles.reviewHead}>
            <h4 id={"reviewName" + review.name}>{review.name} </h4>
            <div>
              {[...Array(5)].map((_star, index) => (
                <BsStarFill
                  id={"starDisplay" + review.name + (index + 1)}
                  key={`star-review-${index}`}
                  style={{
                    color: review.rating >= index + 1 ? "yellow" : "black",
                  }}
                ></BsStarFill>
              ))}
            </div>
          </div>
          <div id={"reviewText" + review.text} className={styles.reviewText}>
            {review.text}
          </div>
        </div>
      ))}
      {!max && !loading && (
        <div className={styles.loadMore} onClick={handleLoadMore}>
          Load more?
        </div>
      )}

      {!loading && !error && reviews && reviews.length === 0 && (
        <p>No reviews for this movie yet</p>
      )}
    </div>
  );
};

export default ReviewDisplay;
