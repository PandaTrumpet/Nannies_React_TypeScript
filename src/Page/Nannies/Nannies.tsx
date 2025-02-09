import { useDispatch, useSelector } from "react-redux";
import css from "./Nannies.module.css";
import { AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { getNannieById, getNannies } from "../../redux/nannies/operation";
import { nanniesSelectors } from "../../redux/nannies/selectors";
import Filter from "../../components/Filter/Filter";
import Questionnaire from "../../components/Questionnaire/Questionnaire";
const Nannies = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getNannies());
    dispatch(getNannieById(5));
  }, [dispatch]);
  const nannies = useSelector(nanniesSelectors);
  console.log(nannies);

  return (
    <div className={css.nanniesCont}>
      <Filter />
      <div>
        <Questionnaire />
      </div>
    </div>
  );
};

export default Nannies;
