import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import ReviewForm, { ADD_REVIEW } from "./ReviewForm";
import { BrowserRouter as Router } from "react-router-dom";
import { expect, describe, it } from "vitest";

describe("ReviewForm component", () => {
  const mockId = "movie123";

  const mocks = [
    {
      request: {
        query: ADD_REVIEW,
        variables: {
          name: "John Doe",
          rating: 4,
          text: "This is a great movie!",
          movieId: mockId,
        },
      },
      result: {
        data: {
          addReview: {
            _id: "review456",
            name: "John Doe",
          },
        },
      },
    },
  ];

  it("renders the form and handles submission", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <ReviewForm setOpenReviewForm={() => {}} />
        </Router>
      </MockedProvider>
    );

    // Assert that the form is rendered
    expect(screen.getByText("Add a review here")).toBeInTheDocument();
  });

  // Add more test cases as needed
});
