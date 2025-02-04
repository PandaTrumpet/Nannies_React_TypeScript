import { Link, useLocation } from "react-router-dom";
import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useRef } from "react";
interface isActiveProps {
  isActive: boolean;
}
const Navigation = () => {
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
            <button className={css.loginBtn}>Log In</button>
          </li>
          <li>
            <button className={css.registerBtn}>Registration</button>
          </li>
        </ul>
      </div>

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
