import { Fragment } from "react";
import { Route, Routes } from 'react-router-dom'
import "swiper/scss";
import Main from "./components/layouts/Main";
import HomePage from "./pages/HomePage";
import { Banner } from "./components";
import MoviePage from "./pages/MoviePage";
import MovieDetail from "./pages/MovieDetail";
// import { NavLink } from 'react-router-dom'

function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main></Main>}>
          <Route path="/" element={
            <>
              <Banner></Banner>
              <HomePage></HomePage>
            </>
          }></Route>
          <Route path="/movies" element={
            <MoviePage></MoviePage>
          }></Route>
          <Route path="/movies/:movieId" element={
            <MovieDetail></MovieDetail>
          }></Route>
        </Route>
      </Routes>

    </Fragment>
  );
}

export default App;
