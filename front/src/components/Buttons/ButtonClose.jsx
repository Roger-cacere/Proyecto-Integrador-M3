import styles from "./Buttons.module.css";
import { Link, useLocation } from "react-router-dom";

const ButtonClose = ({ onLogout }) => {
  const location = useLocation();

  return (
    <div className={styles.contenedorDeBotones}>
      {location.pathname !== "/home" && location.pathname !== "/misTurnos" && location.pathname !== "/crearTurno" ? (
        ""
      ) : (
        <Link to="/inicio" className={styles.close} onClick={onLogout}>
          Cerrar Sesión
        </Link>
      )}
    </div>
  );
};

export default ButtonClose;
