import CajasContenedoras from "./CajasContenedoras";
import styles from "./CajasContenedoras.module.css";

const ContenedorCards = ({ title, elements }) => {
  return (
    <>
      <section className={styles.contenedor}>
        <div className={styles.contenedorCards}>
          <h2>{title}</h2>
          <CajasContenedoras elements={elements} />
        </div>
      </section>

    </>
  );
};

export default ContenedorCards;