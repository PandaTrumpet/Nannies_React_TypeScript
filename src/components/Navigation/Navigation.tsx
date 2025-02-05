import { Link, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { openModalWindow } from "../../redux/modal/slice";
import SimpleModal from "../SimpleModal/SimpleModal";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
interface isActiveProps {
  isActive: boolean;
}
const Navigation = () => {
  const [registerBtn, setRegisterBtn] = useState<string>("");
  const dispatch = useDispatch();
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
          <li>
            <button
              className={css.loginBtn}
              onClick={() => {
                dispatch(openModalWindow());
                setRegisterBtn("login");
              }}
            >
              Log In
            </button>
          </li>
          <li>
            <button
              className={css.registerBtn}
              onClick={() => {
                dispatch(openModalWindow());
                setRegisterBtn("register");
              }}
            >
              Registration
            </button>
          </li>
        </ul>
      </div>
      {registerBtn === "login" ? (
        <SimpleModal>
          <Login />
        </SimpleModal>
      ) : (
        <SimpleModal>
          <Registration />
        </SimpleModal>
      )}

      <div className={css.userLoggedCont}>
        <div>
          <img src="" alt="" />
          <p>User Name</p>
        </div>
        <button>Log out</button>
      </div>
    </nav>
  );
};

export default Navigation;
