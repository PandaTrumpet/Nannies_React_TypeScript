import css from "./MakeAnAppointment.module.css";

const MakeAnAppointment = () => {
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
        <img src="" alt="" className={css.nannieFoto} />
        <div className={css.nannieContInfo}>
          <p>Your nanny</p>
          <h3>Anna Shevchenko</h3>
        </div>
      </div>
      <form>
        <div>
          <input type="text" placeholder="Address" />
          <input type="number" />
        </div>
        <div>
          <input type="text" placeholder="Child's age" />
          <input type="time" value="" />
        </div>
        <div>
          <input type="email" />
          <input type="text" />
          <textarea />
        </div>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default MakeAnAppointment;
