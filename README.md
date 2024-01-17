# MovieBase

We have chosen to make a website for displaying and filtering/searching for movies.
The dataset is from Kaggle, and includes movies from imdb.
The application was made using Vite, and was programmed using Typescript/React.
To run the application, download this repository, run "npm install" in both the frontend and the backend folder, then "npm run dev" in frontend, and "npm start" in backend to start the webiste.

# Frameworks

We are using vitest for managing the tests, and @testing-library/react for writing the tests.
We use prettier and eslint debugging and formatting code.
We use ApolloServer and GraphQL with MongoDB as backend, and ApolloClient to cache the results from querys to avoid sending multiple queries for the same session.
We also use makevar from apollo client to store global variables for filters that have been selected. The selected genre and sorting filter is remembered between components.
We have not used third party components from css because we were interested in learning css from scratch.

# Testing

We have used vitest with react testing library to perform component testing, and used Cypress for end-to-end testing. To run the component tests just type "npm test" inside the frontend folder. To run the end-to-end test, type "npx cypress run" in the frontend folder, to run the end-to-end test.

We have opted out of testing features such as submitting a review in the component tests, as these are more tested in the end-to-end tests.

# Issues

There are a couple of issues on the VM version: The template image for movies without images is not loaded, and the genre buttons on the home page (carousel) does not update the genre field in filterview (/filter). This works locally, however.
