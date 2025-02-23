import { useState } from "react";
import css from "./MakeAnAppointment.module.css";
import { useSelector } from "react-redux";
import { selectModalData } from "../../redux/modal/selectors";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const MakeAnAppointment = () => {
  const [time, setTime] = useState<string>("");
  const nannie = useSelector(selectModalData);
  interface IFormInput {
    address: string;
    phone: string;
    age: number;
    time: string;
    email: string;
    parentName: string;
    comment: string;
  }
  const appointmentSchema = yup.object({
    address: yup.string().required("Address is required"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^\+380\d+$/, "Only numbers"),
    age: yup
      .number()
      .typeError("Child's age must be a number")
      .required("Child's age is required"),
    time: yup.string().required("Time is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    parentName: yup.string().required("Parent's name is required"),
    comment: yup.string().required("Comment is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(appointmentSchema),
    mode: "onChange",
    defaultValues: {
      phone: "+380",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
  };
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
      <form className={css.appointmentForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.contactCont}>
          <div>
            {" "}
            <input type="text" placeholder="Address" {...register("address")} />
            {errors.address && (
              <p className={css.errors}>{errors.address.message}</p>
            )}
          </div>
          <div>
            <input {...register("phone")} type="text" />
            {errors.phone && (
              <p className={css.errors}>{errors.phone.message}</p>
            )}
          </div>
        </div>
        <div className={css.timeCont}>
          <div>
            {" "}
            <input type="text" placeholder="Child's age" {...register("age")} />
            {errors.age && <p className={css.errors}>{errors.age.message}</p>}
          </div>
          <div>
            <input
              {...register("time")}
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            {errors.time && <p className={css.errors}>{errors.time.message}</p>}
          </div>
        </div>
        <div className={css.infoCont}>
          <input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <p className={css.errors}>{errors.email.message}</p>}
          <input
            type="text"
            placeholder="Father's or mother's name"
            {...register("parentName")}
          />
          {errors.parentName && (
            <p className={css.errors}>{errors.parentName.message}</p>
          )}
          <textarea placeholder="Comment" {...register("comment")} />
          {errors.comment && (
            <p className={css.errors}>{errors.comment.message}</p>
          )}
        </div>
        <button type="submit" className={css.makeBtn}>
          Send
        </button>
      </form>
    </div>
  );
};

export default MakeAnAppointment;
