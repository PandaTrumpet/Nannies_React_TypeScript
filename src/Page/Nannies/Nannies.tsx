import { useDispatch, useSelector } from "react-redux";
import css from "./Nannies.module.css";
import { AppDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import { getNannies } from "../../redux/nannies/operation";
import {
  // favoriteNannies,
  lastKey,
  nanniesSelectors,
} from "../../redux/nannies/selectors";

import Questionnaire from "../../components/Questionnaire/Questionnaire";

const Nannies = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const favorite = useSelector(favoriteNannies);
  // console.log(favorite);

  // Локальное состояние для сортировки
  const [sortOption, setSortOption] = useState<
    | "AtoZ"
    | "ZtoA"
    | "LessThan10"
    | "GreaterThan10"
    | "Popular"
    | "NotPopular"
    | "ShowAll"
  >("ShowAll");
  const nannies = useSelector(nanniesSelectors);
  const lastKeySelect = useSelector(lastKey);
  console.log(nannies);
  // При первоначальной загрузке получаем данные с сортировкой "AtoZ"
  useEffect(() => {
    if (nannies.length === 0) {
      dispatch(getNannies({ startKey: null, sortOption }));
    }
  }, [dispatch, nannies.length, sortOption]);

  // Обработчик изменения сортировки
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value as typeof sortOption;
    setSortOption(selectedOption);
    // Получаем данные заново с выбранной сортировкой (без startKey для нового запроса)
    dispatch(getNannies({ startKey: null, sortOption: selectedOption }));
  };

  return (
    <div className={css.nanniesCont}>
      <div className={css.nanniesCenter}>
        <div className={css.filter}>
          <p className={css.filterTitle}>Filter</p>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="ShowAll">Show all</option>
            <option value="AtoZ">A to Z</option>
            <option value="ZtoA">Z to A</option>
            <option value="LessThan10">Less than 10$</option>
            <option value="GreaterThan10">Greater than 10$</option>
            <option value="Popular">Popular</option>
            <option value="NotPopular">Not popular</option>
          </select>
        </div>
        {nannies.length !== 0 ? (
          <ul>
            {nannies.map((nannie, index) => (
              <li key={index}>
                <Questionnaire nannie={nannie} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={css.noNannies}>Ther is no nannies</p>
        )}
        {/* {nannies.length > 0 && (
          <button
            className={css.loadBtn}
            onClick={() =>
              dispatch(getNannies({ startKey: lastKeySelect, sortOption }))
            }
          >
            More
          </button>
        )} */}
        {lastKeySelect && nannies.length > 0 && (
          <button
            className={css.loadBtn}
            onClick={() =>
              dispatch(getNannies({ startKey: lastKeySelect, sortOption }))
            }
          >
            More
          </button>
        )}
      </div>
    </div>
  );
};

export default Nannies;
