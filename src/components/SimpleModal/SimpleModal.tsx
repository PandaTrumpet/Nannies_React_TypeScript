import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import "./SimpleModal.css";

import { useDispatch, useSelector } from "react-redux";
import { openModalWindow, closeModalWindow } from "../../redux/modal/slice.js";
import { selectOpenModal } from "../../redux/modal/selectors.js";
const SimpleModal = ({ children }) => {
  const [closing, setClosing] = useState(false);

  const selectModal = useSelector(selectOpenModal);
  const dispatch = useDispatch();
  useEffect(() => {
    // Логика для закрытия окна при нажатии клавиши Esc
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closedModal(); // Закрываем модальное окно
      }
    };

    // Добавляем слушатель события на нажатие клавиш
    if (selectModal) {
      document.addEventListener("keydown", handleKeyDown);
    }

    // Убираем слушатель при закрытии окна или при размонтировании компонента
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectModal]);

  const closedModal = () => {
    setClosing(true); // Начинаем анимацию закрытия
    setTimeout(() => {
      dispatch(closeModalWindow());
      setClosing(false);
    }, 300); // Таймаут для анимации закрытия (0.3s)
  };

  useEffect(() => {
    if (!selectModal) {
      setClosing(false); // Если модальное окно закрыто, сбрасываем анимацию
    }
  }, [selectModal]);

  return (
    <>
      {selectModal && (
        <div
          className={`modal ${closing ? "modal-close" : ""}`}
          onClick={closedModal}
        >
          <div className="modal-wrapper">
            <div
              onClick={(e) => e.stopPropagation()}
              className={`modal-content ${
                closing ? "modal-content-close" : ""
              }`}
            >
              <button className="modal-close-button" onClick={closedModal}>
                <MdOutlineClose size={18} />
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleModal;
