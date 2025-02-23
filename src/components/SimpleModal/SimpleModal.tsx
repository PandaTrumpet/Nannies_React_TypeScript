import { ReactNode, useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import "./SimpleModal.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModalWindow } from "../../redux/modal/slice.js";
import { selectOpenModal } from "../../redux/modal/selectors.js";
interface SimpleModalProps {
  children: ReactNode;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ children }) => {
  const [closing, setClosing] = useState(false);

  const selectModal = useSelector(selectOpenModal);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closedModal();
      }
    };

    if (selectModal) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectModal]);

  const closedModal = () => {
    setClosing(true);
    setTimeout(() => {
      dispatch(closeModalWindow());
      setClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (!selectModal) {
      setClosing(false);
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
