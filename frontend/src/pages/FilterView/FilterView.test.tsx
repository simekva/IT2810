import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import FilterView, { GET_MOVIES } from "./FilterView";
import { MockedProvider } from "@apollo/client/testing";

describe("Filterview Component", () => {
  const mocks = [
    {
      request: {
        query: GET_MOVIES,
        variables: {
          genres: ["Action"],
          amount: 24,
          sortOrder: null,
          offset: 0,
        },
      },
      result: {
        data: {
          getMovies: {
            movies: [
              { _id: "1", Series_Title: "Movie 1", Poster_Link: "poster1.jpg" },
              // Add more movie objects as needed
            ],
            totalPages: 3,
          },
        },
      },
    },
  ];
  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/genre/Action"]}>
          <Routes>
            <Route path="/genre/:id" element={<FilterView />}></Route>
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );
  });

  it("renders FilterView Component and navigates to home on back button"),
    async () => {
      // Wait for page to load
      await screen.findByText("Loading...");

      expect(screen.getByText("Movie 2")).toBeInTheDocument();
    };
});
