import css from "./Home.module.css";
import background from "../../image/home_background.jpg";

import { GoArrowUpRight } from "react-icons/go";
const Home = () => {
  return (
    <div className={css.homeCont}>
      <div className={css.firstCont}>
        <div className={css.titleCont}>
          <h1 className={css.homeTitle}>
            Make Life Easier <br />
            for the Family:
          </h1>
          <p className={css.homeText}>
            Find Babysitters Online for All Occasions
          </p>
          <button className={css.homeBtn}>
            Get Started
            <GoArrowUpRight color="#fbfbfb" size={24} />
          </button>
        </div>
      </div>
      <div
        className={css.secondCont}
        style={{ backgroundImage: `url(${background})` }}
      ></div>
    </div>
  );
};

export default Home;
