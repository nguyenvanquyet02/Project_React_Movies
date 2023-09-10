import { Fragment, lazy, Suspense } from "react";
// use lazy, Suspense de su dung ki thuat Code splitting Routes: o trang nao tai trang do
// Suspense tri hoan , dung toi moi load dl
import { Route, Routes } from 'react-router-dom'
import "swiper/scss";
import Main from "./components/layouts/Main";
// use lazy
// dynamic import
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const Banner = lazy(() => import("./components/banner/Banner"));
function App() {
  return (
    <Fragment>
      {/* fallback kieu giong loading */}
      <Suspense fallback={<></>}>
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
      </Suspense>
    </Fragment>
  );
}

export default App;
