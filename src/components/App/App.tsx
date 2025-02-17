import Favorites from "../../Page/Favorites/Favorites";
import Home from "../../Page/Home/Home";
import Nannies from "../../Page/Nannies/Nannies";
import RestrictedRout from "../../Page/RestrictedRout";
// import MakeAnAppointment from "../MakeAnAppointment/MakeAnAppointment";
import Navigation from "../Navigation/Navigation";
// import GoogleAuth from "../GoogleAuth/GoogleAuth.jsx";
import css from "./App.module.css";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
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
      </div>
    </>
  );
}

export default App;
