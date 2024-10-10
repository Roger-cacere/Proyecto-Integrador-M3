import styles from "./NavBar.module.css";
import Auth from "../Buttons/Auth";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import ButtonClose from "../Buttons/ButtonClose";

const Navbar = ({ userLogged, setUserLogged }) => {
  const handleLogout = () => {
    setUserLogged(false);
  };

  return (
    <>
      <header>
        <nav>
          <div className={styles.navbar}>
            <Logo/>
            <ul className={styles.navegacion}>
              <li className={styles.About}>
                <a href="#">About</a>
              </li>
              <li className={styles.Contact}>
                <a href="#">Contacto</a>
              </li>
              {userLogged && (
                <>
                  <li className={styles.MyTurns}>
                    <Link to="/misTurnos">Mis turnos</Link>
                  </li>
                  <li>
                    <Link to="/crearTurno">Crear Turno</Link>
                  </li>
                </>
              )}
            </ul>
            {userLogged === true ? (
              <ButtonClose onLogout={handleLogout}>Cerrar Sesión</ButtonClose>
            ) : (
              <Auth
                onLogin={() => setUserLogged(true)}
                className={styles.botones}
              />
            )}
          </div>
        </nav>
      </header>
    </>
  );
};
export default Navbar;
