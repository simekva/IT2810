import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";

describe("Renders navbar", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });

  it("renders the navbar", () => {
    const logoElement = screen.getByText("MovieBase");
    expect(logoElement).toBeInTheDocument();
    const myPageButton = screen.getByTestId("my-page-button");
    expect(myPageButton).toBeInTheDocument();
    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon).toBeInTheDocument();
  });

  it("renders link to index", () => {
    const logoElement = screen.getByText("MovieBase");

    // Click the link
    fireEvent.click(logoElement);
    expect(window.location.pathname).toBe("/");
  });

  it("renders link to /myPage", () => {
    const myPageLink = screen.getByTestId("my-page-button");

    // Take the user to /myPage
    fireEvent.click(myPageLink);
    expect(window.location.pathname).toBe("/myPage");
  });
});
