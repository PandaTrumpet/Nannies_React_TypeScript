import css from "./Home.module.css";
import background from "../../image/home_background.jpg";
import { GoArrowUpRight } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import checkFoto from "../../image/check.png";
import { useEffect } from "react";
import { getAllData } from "../../redux/nannies/operation";
import { AppDispatch } from "../../redux/store";
import { length } from "../../redux/nannies/selectors";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const nanniesLength = useSelector(length);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);
  console.log(nanniesLength);

  return (
    <div className={css.homeCont}>
      <div className={css.centerCont}>
        <div className={css.firstCont}>
          <div className={css.titleCont}>
            <h1 className={css.homeTitle}>
              Make Life Easier <br />
              for the Family:
            </h1>
            <p className={css.homeText}>
              Find Babysitters Online for All Occasions
            </p>
            <button
              className={css.homeBtn}
              onClick={() => navigate("/nannies")}
            >
              Get Started
              <GoArrowUpRight color="#fbfbfb" size={24} />
            </button>
          </div>
        </div>
        <div
          className={css.secondCont}
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className={css.nanniesHomeInfo}>
            <div className={css.checkCont}>
              <img src={checkFoto} alt="" />
            </div>
            <div className={css.nanniesLength}>
              <p>Experienced nannies</p>
              <p>{nanniesLength}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
