import {  useSelector } from "react-redux";
import { favoriteNannies } from "../../redux/nannies/selectors";
import Questionnaire from "../../components/Questionnaire/Questionnaire";
import css from './Favorites.module.css'

const Favorites = () => {

  const favourite = useSelector(favoriteNannies)
  console.log(favourite);
 
  return <div className={ css.favouriteCont}>  {favourite.length !== 0 && (
          <ul>
            {favourite.map((nannie, index) => (
              <li key={index}>
                <Questionnaire nannie={nannie} />
              </li>
            ))}
          </ul>
        )}</div>;
};

export default Favorites;
