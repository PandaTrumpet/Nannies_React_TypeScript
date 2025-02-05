import Favorites from "../../Page/Favorites/Favorites";
import Home from "../../Page/Home/Home";
import Nannies from "../../Page/Nannies/Nannies";
import Navigation from "../Navigation/Navigation";
import Registration from "../Registration/Registration";
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
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
