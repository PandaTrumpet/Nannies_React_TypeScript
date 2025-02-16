import { Link, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModalWindow } from "../../redux/modal/slice";
import SimpleModal from "../SimpleModal/SimpleModal";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
// import { signOut } from "firebase/auth";
// import { auth } from "../../firebase";
// import { isLogged } from "../../redux/auth/selectors";
import { AppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/auth/operation";
import { useAuth } from "../../Context/AuthContext";
import { selectModalType } from "../../redux/modal/selectors";
import MakeAnAppointment from "../MakeAnAppointment/MakeAnAppointment";
interface isActiveProps {
  isActive: boolean;
}
const Navigation = () => {
  const { user } = useAuth();
  // console.log(user);
  // const loggedSelector = useSelector(isLogged);
  // console.log(loggedSelector);

  const dispatch = useDispatch<AppDispatch>();
  const buildLinkClass = ({ isActive }: isActiveProps) => {
    return clsx(css.link, isActive && css.active);
  };
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  useEffect(() => {
    if (navRef.current) {
      if (location.pathname === "/") {
        navRef.current.style.background = "transparent";
      } else {
        navRef.current.style.background = "#0957c3";
      }
    }
  }, [location.pathname]);
  const logOutHandler = () => {
    dispatch(logoutUser());
    console.log("User logged out");
  };
  const modalTypeSelect = useSelector(selectModalType);
  return (
    <nav ref={navRef} className={css.navCont}>
      <div className={css.logoContainer}>
        <Link to="/">Nanny.Services</Link>
      </div>
      <div className={css.loginAndLinkCont}>
        <ul className={css.navMenuList}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/nannies" className={buildLinkClass}>
            Nannies
          </NavLink>
          <NavLink to="/favorites" className={buildLinkClass}>
            Favorites
          </NavLink>
        </ul>

        <ul className={css.registerCont}>
          <ul className={css.registerCont}>
            {user !== null ? (
              <li>
                <div className={css.userLoggedCont}>
                  <div>
                    <img src="" alt="" />
                    <p>User Name</p>
                  </div>
                  <button onClick={logOutHandler}>Log out</button>
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
        </ul>
      </div>
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
