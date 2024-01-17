import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import CarouselItem from "./SliderItem";
import { mockMovies } from "../../setupTests";
import { describe, it, expect, beforeEach } from "vitest";

describe("CarouselItem component", () => {
  beforeEach(() => {
    render(
      <Router>
        <CarouselItem movie={mockMovies[0]} tabIndex={0} width={50} />
      </Router>
    );
  });
  it("renders with correct data", () => {
    // Assert that the title and image are rendered
    expect(screen.getByTestId("test123")).toBeInTheDocument();
  });

  it("handles image error correctly", () => {
    // Simulate image error
    userEvent.click(screen.getByTestId("test123"));

    // Assert that the error state is rendered
    expect(screen.getByTestId("test123")).toContain(
      "http://example.com/poster1.jpg"
    );
  });
});
