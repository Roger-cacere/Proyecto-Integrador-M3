import axios from "axios"
import { useState } from "react";
import { validate } from "../../Helpers/validate";
import styles from "./Register.module.css"

const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [touched, setTouched] = useState({});

  const [errors, setErrors] = useState({
    name: "El Nombre es requerido",
    email: "El Email es Requerido",
    birthdate: "La Fecha de nacimiento es Requerida",
    nDni: "El DNI es Requerido",
    username: "El nombre de usuario es Requerido",
    password: "La Contraseña es Requerida",
    repeatPassword: "La Contraseña es Requerida",
  });
  
  const handleBlur = (event) => {
    const {name} = event.target;

    setTouched((e) => ({
      ...e,
      [name]: true
    }))
  }

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setRegister((prevState) => {
      const updatedRegister = {
        ...prevState,
        [name]: value,
      };
      setErrors(validate(updatedRegister));
      return updatedRegister;
    });

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    setTouched({
      name: true,
      email: true,
      birthdate: true,
      nDni: true,
      username: true,
      password: true,
      repeatPassword: true,
    });

    const emptyFields = Object.keys(register).filter((key) => !register[key]);
    if (emptyFields.length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: "Todos los campos son obligatorios",
      }));
      return;
    }

    const validationErrors = validate(register);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const userRegister = await axios.post("http://localhost:3000/users/register", register);

      setRegister({
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",
        repeatPassword: "",
      });
      
      console.log(userRegister);
    } catch (error) {
      console.log("error");
    }

    alert("Se ha Registrado Correctamente.");
  };


  return (
    <form onSubmit={handleOnSubmit} autoComplete="off">
      <div className={styles.contenedor}>
      <section className={styles.sectionRegister}>
        <h3>Registro de Usuario</h3>
        <p className={styles.subtitulo}>Completa los siguientes campos para crear una nueva cuenta</p>
      </section>
      <section className={styles.Container}>
        <div className={styles.divContainerPrincipal}>
          <div className={styles.divContainerSecondary}>
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Ingresa Tu Nombre"
              name="name"
              value={register.name}
              onChange={handleInputs}
              onBlur={handleBlur}
            />
            {touched.name && errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
          <div className={styles.divContainerSecondary}>
            <label>Correo Electrónico</label>
            <input
              type="text"
              placeholder="Ejemplo@email.com"
              value={register.email}
              name="email"
              onChange={handleInputs}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && <p className={styles.error}>{errors.email} </p>}
          </div>
        </div>
        <div className={styles.divContainerPrincipal}>
          <div className={styles.divContainerSecondary}>
            <label>Fecha de Nacimiento</label>
            <input
              type="date"
              value={register.birthdate}
              name="birthdate"
              onChange={handleInputs}
              onBlur={handleBlur}
            />
            {touched.birthdate && errors.birthdate && (
              <p className={styles.error}>{errors.birthdate} </p>
            )}
          </div>
          <div className={styles.divContainerSecondary}>
            <label>Número de DNI</label>
            <input
              type="text"
              placeholder="Ingresa tu número de DNI"
              value={register.nDni}
              name="nDni"
              onChange={handleInputs}
              onBlur={handleBlur}
            />
            {touched.nDni && errors.nDni && <p className={styles.error}>{errors.nDni} </p>}
          </div>
        </div>
        <div className={styles.divContainerPrincipal}>
          <div className={styles.divContainerSecondary}>
            <label>Nombre de Usuario</label>
            <input
              type="text"
              placeholder="Elige un nombre de usuario"
              value={register.username}
              name="username"
              onChange={handleInputs}
              onBlur={handleBlur}
            />
            {touched.username && errors.username && <p className={styles.error}>{errors.username} </p>}
          </div>
          <div className={styles.divContainerSecondary}>
            <label>Contraseña</label>
            <input
              type="password"
              value={register.password}
              name="password"
              onChange={handleInputs}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && <p className={styles.error}>{errors.password} </p>}
          </div>
        </div>
        <div className={styles.repeatPassword}>
          <label>Repetir Contraseña</label>
          <input
            type="password"
            value={register.repeatPassword}
            name="repeatPassword"
            onChange={handleInputs}
            onBlur={handleBlur}
          />
            {touched.repeatPassword && errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword} </p>}
        </div>
      </section>
        <div className={styles.divContainerTertiary}>
          <button className={styles.register}>Registrarse</button>
        </div>
      </div>
    </form>
  );
};

export default Register;
