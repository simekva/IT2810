import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Carousel from "./Slider";
import { mockMovies } from "../../setupTests";
import { beforeEach, describe, expect, it } from "vitest";

describe("Carousel component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Carousel movies={mockMovies} size={3} />
      </Router>
    );
  });
  it("renders with correct data", () => {
    // Assert that the movies are rendered
    expect(screen.getByTestId("test123")).toBeInTheDocument();
    expect(screen.getByTestId("test456")).toBeInTheDocument();
    expect(screen.getByTestId("test789")).toBeInTheDocument();
  });
  it("handles next and prev buttons correctly", async () => {
    // Click next button
    fireEvent.click(screen.getByTestId("carousel-next"));
    // Wait for animation to complete
    await waitFor(() => screen.getByTestId("test789"));

    // Assert the updated state after clicking next
    expect(screen.getByTestId("test789")).toBeInTheDocument();

    // Click prev button
    fireEvent.click(screen.getByTestId("carousel-prev"));

    // Wait for animation to complete
    await waitFor(() => screen.getByTestId("test123"));
    // Assert the updated state after clicking prev
    expect(screen.getByTestId("test123")).toBeInTheDocument();
  });

  // Add more test cases as needed
});
