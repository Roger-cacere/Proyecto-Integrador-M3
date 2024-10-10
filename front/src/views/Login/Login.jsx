import axios from "axios";
import { useState } from "react";
import { validateLogin } from "../../Helpers/validateLogin";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginFailure } from "../../redux/reducer";
import { useDispatch } from "react-redux";

const Login = ({ setUserLogged }) => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [touched, setTouched] = useState({});

  const [inputErrors, setInputErrors] = useState({
    username: "El Nombre de Usuario es Requerido",
    password: "La contraseña es Requerida",
  });

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((e) => ({
      ...e,
      [name]: true,
    }));
  };

  const distPatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setLogin((preventLogin) => {
      const inputsIngresed = {
        ...preventLogin,
        [name]: value,
      };
      setInputErrors(validateLogin(inputsIngresed));
      return inputsIngresed;
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    setTouched({
      username: true,
      password: true,
    });

    const camposVacios = Object.keys(login).filter((input) => !login[input]);

    if (camposVacios.length > 0) {
      setInputErrors((prevError) => ({
        ...prevError,
        general: "Todos los campos son obligatorios",
      }));

      alert("Todos los campos son OBLIGATORIOS");

      return;
    }

    const errors = validateLogin(login);
    setInputErrors(errors);

    if (Object.keys(errors).length > 0) {
      return alert("Error: Completa todos los campos correctamente.");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        login
      );

      const { login: isLoginSucces, userCredentials } = response.data;

      if (isLoginSucces) {
        distPatch(loginSuccess({ user: userCredentials }));

        setUserLogged(true);

        alert("Se ha logueado Correctamente");

        setLogin({
          username: "",
          password: "",
        });
      }

      handleLogin();
    } catch (error) {
      distPatch(loginFailure({ error: "Usuario o contraseña incorrectos" }));
      alert("Usuario o contraseña incorrectos");
    }

    if (Object.keys(inputErrors).length) {
      return alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={handleOnSubmit} autoComplete="off">
      <div className={styles.contenedor}>
        <h3>Iniciar Sesión</h3>
        <p>
          Ingresa tus credenciales para acceder al sistema de gestión de turnos.
        </p>
        <div className={styles.loginContainer}>
          <div className={styles.loginContent}>
            <label>Nombre de Usuario</label>
            <input
              type="text"
              placeholder="Ingresa tu nombre de usuario"
              name="username"
              value={login.username}
              onChange={handleInputs}
              onBlur={handleBlur}
            />
            {touched.username && inputErrors.username && (
              <p className={styles.error}>{inputErrors.username} </p>
            )}
          </div>
          <div className={styles.loginContent}>
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              name="password"
              value={login.password}
              onChange={handleInputs}
              onBlur={handleBlur}
            />
            {touched.password && inputErrors.password && (
              <p className={styles.error}>{inputErrors.password} </p>
            )}
          </div>
        </div>
        <div className={styles.loginButton}>
          <button className={styles.button}>Iniciar sesión</button>
        </div>
      </div>
    </form>
  );
};

export default Login;
