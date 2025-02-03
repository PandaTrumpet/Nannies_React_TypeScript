import { Link } from "react-router-dom";
import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
interface isActiveProps {
  isActive: boolean;
}
const Navigation = () => {
  const buildLinkClass = ({ isActive }: isActiveProps) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <nav className={css.navCont}>
      <div className={css.logoContainer}>
        <Link to="/">Nanny.Services</Link>
      </div>
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
