import { Toaster } from "react-hot-toast";
import Navigation from "../Navigation/Navigation";
import css from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const Favorites = lazy(() => import("../../Page/Favorites/Favorites"));
const Home = lazy(() => import("../../Page/Home/Home"));
const Nannies = lazy(
  () => import("../../Page/Nannies/Nannies" /* webpackChunkName: "Nannies" */)
);
const RestrictedRout = lazy(
  () =>
    import("../../Page/RestrictedRout" /* webpackChunkName: "RestrictedRout" */)
);

function App() {
  return (
    <div className={css.containerProject}>
      <Navigation />
      <div className={css.mainContainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nannies" element={<Nannies />} />

          <Route
            path="/favorites"
            element={<RestrictedRout component={Favorites} redirectTo="/" />}
          />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </div>
  );
}

export default App;
