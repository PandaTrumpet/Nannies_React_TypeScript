import { useDispatch, useSelector } from "react-redux";
import css from "./Nannies.module.css";
import { AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { getNannies } from "../../redux/nannies/operation";
import { lastKey, nanniesSelectors } from "../../redux/nannies/selectors";
import Filter from "../../components/Filter/Filter";
import Questionnaire from "../../components/Questionnaire/Questionnaire";

const Nannies = () => {
  const dispatch = useDispatch<AppDispatch>();

  const nannies = useSelector(nanniesSelectors);
  const lastKeySelect = useSelector(lastKey);
  console.log(nannies);
  useEffect(() => {
    if (nannies.length === 0) {
      dispatch(getNannies(null));
    }
  }, [dispatch, nannies]);
  return (
    <div className={css.nanniesCont}>
      <div className={css.filter}>
        <Filter />
      </div>
      <div>
        {nannies.length !== 0 && (
          <ul>
            {nannies.map((nannie, index) => (
              <li key={index}>
                <Questionnaire nannie={nannie} />
              </li>
            ))}
          </ul>
        )}

        <button
          className={css.loadBtn}
          onClick={() => dispatch(getNannies(lastKeySelect))}
        >
          More
        </button>
      </div>
    </div>
  );
};

export default Nannies;
