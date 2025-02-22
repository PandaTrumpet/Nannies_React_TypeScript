import { useDispatch, useSelector } from "react-redux";
import css from "./Nannies.module.css";
import { AppDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import { getNannies } from "../../redux/nannies/operation";
import { lastKey, nanniesSelectors } from "../../redux/nannies/selectors";
import Questionnaire from "../../components/Questionnaire/Questionnaire";
import Select from "react-select";

const Nannies = () => {
  const dispatch = useDispatch<AppDispatch>();

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

  useEffect(() => {
    if (nannies.length === 0) {
      dispatch(getNannies({ startKey: null, sortOption }));
    }
  }, [dispatch, nannies.length, sortOption]);

  const options = [
    { value: "ShowAll", label: "Show all" },
    { value: "AtoZ", label: "A to Z" },
    { value: "ZtoA", label: "Z to A" },
    { value: "LessThan10", label: "Less than 10$" },
    { value: "GreaterThan10", label: "Greater than 10$" },
    { value: "Popular", label: "Popular" },
    { value: "NotPopular", label: "Not popular" },
  ];

  const handleSelectChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (selectedOption) {
      const optionValue = selectedOption.value as typeof sortOption;
      setSortOption(optionValue);
      dispatch(getNannies({ startKey: null, sortOption: optionValue }));
    }
  };

  return (
    <div className={css.nanniesCont}>
      <div className={css.nanniesCenter}>
        <div className={css.filter}>
          <p className={css.filterTitle}>Filter</p>

          <Select
            value={options.find((option) => option.value === sortOption)}
            onChange={handleSelectChange}
            options={options}
            isSearchable={false}
            className={css.reactSelect}
            classNamePrefix="react-select"
            styles={{
              control: (provided) => ({
                ...provided,
                borderRadius: "14px",
                cursor: "pointer",
                outlineColor: "transparent",
                padding: "8px 12px",
                fontSize: "18px",
                color: "#fbfbfb",
                backgroundColor: "#0957c3",
              }),
              option: (provided, state) => ({
                ...provided,
                padding: 10,
                fontSize: "18px",
                fontWeight: 400,
                color: state.isSelected
                  ? " #11101c"
                  : state.isFocused
                  ? " #11101c"
                  : "rgba(17, 16, 28, 0.3)",
                backgroundColor: state.isSelected
                  ? "#fff"
                  : state.isFocused
                  ? "#e0e0e0"
                  : "#fff",
                cursor: "pointer",
              }),
              menu: (provided) => ({
                ...provided,
                borderRadius: "14px",
                overflow: "hidden",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "#fbfbfb",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: "#fff",
              }),
            }}
          />
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
          <p className={css.noNannies}>There is no nannies</p>
        )}
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
