import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import CajasContent from "../../components/CajasContenedoras/CajasContent";
import { tarjetas3 } from "../../Helpers/tarjetas";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.userSlice.user);

  return (
    <div className={styles.body}>
      {user ? (
        <>
          <section className={styles.contenedor}>
            <div className={styles.container}>
              <div className={styles.sectionOne}>
                <h1>Bienvenido De Nuevo</h1>
                <p>
                  Aquí podrás ver tus cuentas, préstamos, tarjetas de crédito y
                  tus turnos correspondientes.
                </p>
                <div className={styles.buttonsContainer}>
                  <button className={styles.buttons}>Ver Cuentas</button>
                  <button className={styles.buttons}>Ver Préstamos</button>
                  <Link to="/misTurnos" className={styles.buttons}>
                    Mis Turnos
                  </Link>
                  <Link to="/crearTurno" className={styles.buttons}>
                    Crear Turno
                  </Link>
                </div>
              </div>
              <div className={styles.sectionSecond}>
                <img
                  className={styles.img}
                  src="https://www.shutterstock.com/image-vector/cartoon-drawing-banker-600nw-2072854976.jpg"
                  alt="banco-img"
                />
              </div>
            </div>
          </section>

          <section>
            <div className={styles.cajasContainer}>
              <h3 className={styles.subtitulo}>Tus Últimas Actividades</h3>
              <CajasContent elements={tarjetas3} />
            </div>
          </section>
        </>
      ) : (
        <p>No estás logueado.</p>
      )}
    </div>
  );
};

export default Home;
