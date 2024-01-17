// TESTING ON LOCALHOST

describe("Opens home page", () => {
  it("should load homepage", () => {
    cy.visit("/");
    cy.contains("MovieBase");

    // Assert correct URl
    cy.url().should("eq", "http://localhost:5173/");
  });
});

// NAVBAR TESTING

describe("Navbar test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // Tests clicking the logo
  it("clicks the index and should link to ./", () => {
    cy.contains("MovieBase").click();
    cy.url().should("eq", "http://localhost:5173/");
  });

  // Tests the My Page button
  it("should link to ./myPage", () => {
    cy.contains("My Page").click();
    cy.url().should("eq", "http://localhost:5173/myPage");
  });

  // Tests the search button and the field
  it("clicks the search button and looks for search field", () => {
    cy.get("#searchButton").click();
    cy.get("#searchField").type("Lord of the Rings");

    // TODO Finish testing searching
  });
});

// HOME PAGE TEST

describe("Home page test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // Genre nav at top of page
  it("navigates to genre", () => {
    cy.contains("Romance").click();
    cy.url().should("eq", "http://localhost:5173/filter/Romance");
  });

  // Genre nav above each row of movies
  it("navigates to genre", () => {
    cy.get("#ActionLink").click();
    cy.url().should("eq", "http://localhost:5173/filter/Action");
  });

  it("clicks on movie and navigates to its page", () => {
    // Movie ID of Seppuku
    cy.get("#6558d7c9998dcef6f26c434d").click();
    cy.url().should(
      "eq",
      "http://localhost:5173/movie/6558d7c9998dcef6f26c434d"
    );
  });
});

// GENRE PAGE TEST (./genre/Action)

describe("Genre page test", () => {
  beforeEach(() => {
    cy.visit("filter/Action");
  });

  // Test genreSelect field
  it("changes genre to selected genre", () => {
    cy.url().should("eq", "http://localhost:5173/filter/Action");
    cy.get("#genreSelect").select("Musical");
    cy.url().should("eq", "http://localhost:5173/filter/Musical");
  });

  it("tests go back button", () => {
    cy.get("#backButton").click();
    cy.url().should("eq", "http://localhost:5173/");
  });

  it("tests clicking on a movie", () => {
    // ID of Lord of the Rings
    cy.get("#6558d7c9998dcef6f26c4334").click();
    cy.url().should(
      "eq",
      "http://localhost:5173/movie/6558d7c9998dcef6f26c4334"
    );
  });
});

// MOVIE PAGE TEST

describe("Movie page test", () => {
  beforeEach(() => {
    // ID for Forrest Gump
    cy.visit("movie/6558d7c9998dcef6f26c433a");
  });

  it("renders the page correctly", () => {
    cy.get("#header").invoke("text").should("eq", "Forrest Gump");

    // TODO Check that adding to favorite ads it to favorites in myPage
  });
});

// FULL END TO END TEST

describe("Navigates to a movie and posts review", () => {
  it("Navigates to a movie and posts review", () => {
    cy.visit("/"); // Start at main page
    cy.contains("Romance").click(); // Navigate to /filter/Romance
    cy.get("#genreSelect").select("Action"); // Navigate to /filter/Action
    cy.get("#6558d7c9998dcef6f26c4334").click(); // Navigate to filmview

    cy.get("#openFormButton").click(); // Open form for posting review

    cy.get("#star3").click(); // Click 3 stars
    cy.get("#enterName").type("Cypress_test"); // Type in reviewer name
    cy.get("#enterText").type("complete"); // type in review text
    cy.contains("Leave Review").click(); // Push review to database
    cy.reload();

    cy.get("#reviewNameCypress_test") // Expect name on the review to be equal to name given
      .invoke("text")
      .should("eq", "Cypress_test ");
    cy.get("#reviewTextcomplete").invoke("text").should("eq", "complete"); // Expect text on the review to be equal to text given
    cy.get("#starDisplayCypress_test3").should(
      // Expect 3 stars
      "have.css",
      "color",
      "rgb(255, 255, 0)"
    );
    cy.get("#starDisplayCypress_test4").should(
      // Expect 4th star shouldnt be lighteed up.
      "have.css",
      "color",
      "rgb(0, 0, 0)"
    );
  });
  it("tests search to navigate to movie and check review", () => {
    cy.visit("/");
    cy.get("#searchButton").click();
    cy.get("#searchField").type("Lord of the Rings");
    cy.get("#searchResult_6558d7c9998dcef6f26c4334").click();
    cy.url().should(
      "eq",
      "http://localhost:5173/movie/6558d7c9998dcef6f26c4334"
    );

    cy.get("#reviewNameCypress_test") // Expect name on the review to be equal to name given
      .invoke("text")
      .should("eq", "Cypress_test ");
    cy.get("#reviewTextcomplete").invoke("text").should("eq", "complete"); // Expect text on the review to be equal to text given
    cy.get("#starDisplayCypress_test3").should(
      // Expect 3 stars
      "have.css",
      "color",
      "rgb(255, 255, 0)"
    );
    cy.get("#starDisplayCypress_test4").should(
      // Expect 4th star shouldnt be lighteed up.
      "have.css",
      "color",
      "rgb(0, 0, 0)"
    );
  });
  it("ads to favorites", () => {
    cy.visit("/");
    cy.get("#6558d7c9998dcef6f26c43d0").click();
    cy.get("#addFavorite").click();
    cy.contains("My Page").click();
    cy.get("#6558d7c9998dcef6f26c43d0").click();
    cy.url().should(
      "eq",
      "http://localhost:5173/movie/6558d7c9998dcef6f26c43d0"
    );
  });
});
