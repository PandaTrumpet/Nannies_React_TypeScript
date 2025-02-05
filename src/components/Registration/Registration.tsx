import css from "./Registration.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { closeModalWindow } from "../../redux/modal/slice";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}
const Registration = () => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    name: yup.string().required("Required!").min(5, "Too short!"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Required!").min(3, "To short password!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    dispatch(closeModalWindow());
  };

  return (
    <div className={css.registerCont}>
      <div className={css.titleCont}>
        <h2>Registration</h2>
        <p>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          className={css.formInput}
          type="text"
          placeholder="Name"
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}
        <input
          {...register("email")}
          className={css.formInput}
          type="email"
          placeholder="Email"
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
        <input
          {...register("password")}
          className={css.formInput}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}

        <input type="submit" value="Submit" className={css.registerBtn} />
      </form>
    </div>
  );
};

export default Registration;
