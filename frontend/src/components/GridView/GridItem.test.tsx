import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import GridItem from "./GridItem";
import { describe, it, expect, beforeEach } from "vitest";
import { mockMovies } from "../../setupTests";

describe("GridItem component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <GridItem movie={mockMovies[0]} />
      </BrowserRouter>
    );
  });
  it("renders with correct data", () => {
    // Assert that the movie is rendered
    expect(screen.getByTestId("test123")).toBeInTheDocument();
  });
});
