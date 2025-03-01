import { Link, useLocation, NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { openModalWindow } from "../../redux/modal/slice";
import SimpleModal from "../SimpleModal/SimpleModal";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import userFoto from "../../image/UserFoto.png";
import { AppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/auth/operation";
import { useAuth } from "../../Context/AuthContext";
import { selectModalType } from "../../redux/modal/selectors";
import MakeAnAppointment from "../MakeAnAppointment/MakeAnAppointment";
import toast from "react-hot-toast";
import { useState } from "react";

const Navigation = () => {
  const [isVisibleMobile, setIsVisibleMobile] = useState(false);
  const handleToggle = () => setIsVisibleMobile(!isVisibleMobile);
  const { user, isAuthReady } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const buildLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(css.link, isActive && css.active);

  const navBackground = location.pathname === "/" ? "transparent" : "#0957c3";

  const logOutHandler = () => {
    dispatch(logoutUser());
    toast.success("User logged out");
  };

  const modalTypeSelect = useSelector(selectModalType);
  if (!isAuthReady) return null;

  return (
    <nav className={css.navCont} style={{ background: navBackground }}>
      <div className={css.logoContainer}>
        <Link to="/">Nanny.Services</Link>
      </div>

      <ul className={isVisibleMobile ? css.navMenuListHidden : css.navMenuList}>
        <NavLink
          to="/"
          className={buildLinkClass}
          onClick={() => setIsVisibleMobile(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/nannies"
          className={buildLinkClass}
          onClick={() => setIsVisibleMobile(false)}
        >
          Nannies
        </NavLink>
        {user && (
          <NavLink
            to="/favorites"
            className={buildLinkClass}
            onClick={() => setIsVisibleMobile(false)}
          >
            Favorites
          </NavLink>
        )}
      </ul>

      <ul className={css.registerCont}>
        {user !== null ? (
          <li>
            <div className={css.userLoggedCont}>
              <div className={css.userCont}>
                <div className={css.userFoto}>
                  <img src={userFoto} alt="" />
                </div>
                <p>{user.displayName}</p>
              </div>
              <button onClick={logOutHandler} className={css.logOutBtn}>
                Log out
              </button>
            </div>
          </li>
        ) : (
          <>
            <li>
              <button
                className={css.loginBtn}
                onClick={() => {
                  dispatch(openModalWindow({ modalType: "login" }));
                }}
              >
                Log In
              </button>
            </li>
            <li>
              <button
                className={css.registerBtn}
                onClick={() => {
                  dispatch(openModalWindow({ modalType: "register" }));
                }}
              >
                Registration
              </button>
            </li>
          </>
        )}
      </ul>
      <button
        className={
          isVisibleMobile ? css.mobileMenuIconActive : css.mobileMenuIcon
        }
        onClick={handleToggle}
      >
        {isVisibleMobile ? <>&#10005;</> : <>&#9776;</>}
      </button>
      {modalTypeSelect === "login" && (
        <SimpleModal>
          <Login />
        </SimpleModal>
      )}
      {modalTypeSelect === "register" && (
        <SimpleModal>
          <Registration />
        </SimpleModal>
      )}
      {modalTypeSelect === "appointment" && (
        <SimpleModal>
          <MakeAnAppointment />
        </SimpleModal>
      )}
    </nav>
  );
};

export default Navigation;
