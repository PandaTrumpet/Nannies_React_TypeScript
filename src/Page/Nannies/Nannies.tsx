import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { getNannieById, getNannies } from "../../redux/nannies/operation";
import { nanniesSelectors } from "../../redux/nannies/selectors";
const Nannies = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getNannies());
    dispatch(getNannieById(5));
  }, [dispatch]);
  const nannies = useSelector(nanniesSelectors);
  console.log(nannies);

  return <div>Nannies</div>;
};

export default Nannies;
