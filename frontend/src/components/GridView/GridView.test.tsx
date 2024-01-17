import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import GridView from "./GridView";
import { mockMovies } from "../../setupTests";

describe("GridView component", () => {
  it("renders with mock data", () => {
    render(
      <BrowserRouter>
        <GridView movies={mockMovies}></GridView>
      </BrowserRouter>
    );

    expect(screen.getByTestId("test123")).toBeInTheDocument();
    expect(screen.getByTestId("test456")).toBeInTheDocument();
    expect(screen.getByTestId("test789")).toBeInTheDocument();
  });
});
