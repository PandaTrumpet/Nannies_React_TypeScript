import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./Login.module.css";
import { useDispatch } from "react-redux";
import { closeModalWindow } from "../../redux/modal/slice";
import { loginUser } from "../../redux/auth/operation";
import { AppDispatch } from "../../redux/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(loginUser({ email: data.email, password: data.password }))
      .unwrap()
      .then(() => {
        toast.success("Logged in!");
        setTimeout(() => {
          dispatch(closeModalWindow());
        }, 300);
        navigate("/nannies");
      })
      .catch(() => toast.error("Failed email or password!"));
  };

  return (
    <div className={css.loginCont}>
      <div className={css.loginTitleCont}>
        <h2>Log In</h2>
        <p>
          Welcome back! Please enter your credentials to access your account and
          continue your babysitter search.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.formCont}>
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className={css.loginInput}
          required
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className={css.loginInput}
          autoComplete="off"
          required
        />
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}

        <input type="submit" value="Log In" className={css.loginBtn} />
      </form>
    </div>
  );
};

export default Login;
