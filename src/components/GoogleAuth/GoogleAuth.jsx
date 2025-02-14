import { GoogleLogin } from "@react-oauth/google";
// import axiosInstance from "../axios/axiosInstance.js";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const GoogleAuth = () => {
  const handleSuccess = async (response) => {
    console.log("Ответ Google:", response);
    try {
      // 1. Получаем id_token от Google
      const { credential: id_token } = response;
      if (!id_token) {
        console.error("Ошибка: Google не вернул id_token");
        return;
      }
      // console.log(id_token);

      // 2. Декодируем, если нужно получить email, имя и т.п.
      const decoded = jwtDecode(id_token);
      console.log("Декодированный токен:", decoded);

      // 3. Отправляем запрос на /auth/login, указывая provider: "google" и передавая id_token
      const { data } = await axios.post(
        "https://admin.elastic-visvesvaraya.212-227-79-42.plesk.page/auth/login",
        {
          mode: "json",
          provider: "google",
          id_token,
        }
      );

      console.log("Ответ от Directus:", data);

      // 4. Если нужно, сохраняем токены (если сервер вернет access_token/refresh_token)
      // const { access_token, refresh_token, user } = data;
      // localStorage.setItem("access_token", access_token);
      // localStorage.setItem("refresh_token", refresh_token);

      // 5. Уведомляем пользователя
      alert("Вы успешно вошли через Google!");
    } catch (error) {
      console.error(
        "Ошибка авторизации:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="google-container">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Ошибка входа через Google")}
      />
    </div>
  );
};

export default GoogleAuth;
