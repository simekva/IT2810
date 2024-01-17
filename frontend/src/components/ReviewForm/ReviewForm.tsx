import { useState } from "react";
import styles from "./ReviewForm.module.css";
import { gql, useMutation } from "@apollo/client";
import { BsStarFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";

const ADD_REVIEW = gql`
  mutation AddReview(
    $name: String!
    $rating: Int!
    $text: String!
    $movieId: ID!
  ) {
    addReview(name: $name, rating: $rating, text: $text, movieId: $movieId) {
      _id
      name
    }
  }
`;

interface reviewFormProps {
  setOpenReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewForm: React.FC<reviewFormProps> = ({ setOpenReviewForm }) => {
  const [rating, setRating] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const { id } = useParams(); // Get id from URL

  const [addReview, { data, loading, error }] = useMutation(ADD_REVIEW);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(id);

      await addReview({
        variables: {
          name: name,
          rating: rating + 1, // 0-index, check BsStarFill in return statement
          text: text,
          movieId: id,
        },
      });

      setName("");
      setRating(0);
      setText("");
      setOpenReviewForm(false);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className={styles.container}>
      {!loading && !error && (
        <>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h1 className={styles.formHead}>Add a review here</h1>
            <div className={styles.ratingContainer}>
              {[...Array(5)].map((_star, index) => (
                <BsStarFill
                  key={`star-${index}`}
                  data-testid={"star" + (index + 1)}
                  id={"star" + (index + 1)}
                  style={{ color: rating >= index ? "yellow" : "white" }}
                  onClick={() => setRating(index)}
                ></BsStarFill>
              ))}
            </div>
            <div className={styles.nameInput}>
              <label htmlFor="enterName">Name:</label>
              <input
                type="text"
                id="enterName"
                name="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </div>

            <div className={styles.textInput}>
              <label htmlFor="enterText">Text:</label>
              <textarea
                name="text"
                id="enterText"
                value={text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setText(e.target.value)
                }
              ></textarea>
            </div>
            {loading && <p>Submitting review...</p>}
            {error && <p>Error submitting review. Please try again.</p>}
            {data && <p>Review submitted!</p>}
            <button className={styles.submit} type="submit">
              Leave Review
            </button>
          </form>
        </>
      )}
      <IoClose
        className={styles.closeForm}
        onClick={() => {
          setOpenReviewForm(false);
        }}
      />
    </div>
  );
};

export default ReviewForm;
export { ADD_REVIEW };
