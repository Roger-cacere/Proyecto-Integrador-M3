import styles from "./Inicio.module.css";
import { tarjetas, tarjetas2 } from "../../Helpers/tarjetas";
import ContenedorCards from "../../components/CajasContenedoras/ContenedorCards";

const Inicio = () => {
  return (
    <div className={styles.body}>
      <section className={styles.contenedor}>
        <div className={styles.container}>
          <div className={styles.sectionOne}>
            <h1>Bienvenido a Nuestro Banco Stitch</h1>
            <p>
            Tu futuro financiero comienza aquí. En Banco Stitch, estamos comprometidos con ofrecerte soluciones bancarias que se adapten a tu vida y a tus metas. Desde cuentas de ahorro 
            flexibles hasta préstamos personalizados y servicios de inversión, nuestra plataforma en línea está diseñada para que gestiones tu dinero de manera rápida, segura y sencilla.
            Descubre nuestra banca digital, accesible desde cualquier lugar, las 24 horas del día. Con Banco Stitch, tienes el control total de tus finanzas en la palma de tu mano.
            </p>
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
      <ContenedorCards
        title={"Nuestros Productos y Servicios"}
        elements={tarjetas}
      />
    </div>
  );
};

export default Inicio;
