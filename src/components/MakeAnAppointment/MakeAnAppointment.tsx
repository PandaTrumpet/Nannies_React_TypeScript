import { useState } from "react";
import css from "./MakeAnAppointment.module.css";
import { useSelector } from "react-redux";
import { selectModalData } from "../../redux/modal/selectors";

const MakeAnAppointment = () => {
  const [time, setTime] = useState<string>("");
  const nannie = useSelector(selectModalData);
  console.log(nannie);

  return (
    <div className={css.appointmentCont}>
      <div className={css.appointTitleCont}>
        <h2>
          Make an appointment <br /> with a babysitter
        </h2>
        <p>
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>
      </div>
      <div className={css.nannieInfo}>
        <img src={nannie?.photo} alt="" className={css.nannieFoto} />
        <div className={css.nannieContInfo}>
          <p>Your nanny</p>
          <h3>{nannie?.name}</h3>
        </div>
      </div>
      <form className={css.appointmentForm}>
        <div className={css.contactCont}>
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="+380" />
        </div>
        <div className={css.timeCont}>
          <input type="text" placeholder="Child's age" />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className={css.infoCont}>
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Father's or mother's name" />
          <textarea placeholder="Comment" />
        </div>
        <button className={css.makeBtn}>Send</button>
      </form>
    </div>
  );
};

export default MakeAnAppointment;
