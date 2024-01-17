import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import NoPageFound from "./components/NoPageFound/NoPageFound";

import FilterView from "./pages/FilterView/FilterView";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import MyPage from "./pages/MyPage/MyPage";
import FilmView from "./pages/FilmView/FilmView";

const client = new ApolloClient({
  uri: "http://localhost:2500/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/project2" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/project2/movie/:id" element={<FilmView />} />
              <Route path="/project2/filter/:id?" element={<FilterView />} />
              <Route path="/project2/myPage" element={<MyPage />} />
              <Route path="*" element={<NoPageFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    </ApolloProvider>
  );
}

export default App;
