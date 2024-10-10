import styles from "./CajasContenedoras.module.css";

const CajasContenedoras = ({ elements }) => {
  return (
    <div className={styles.cajaContainer}>
      {elements.map((element, index) => {
        return (
          <div key={index} className={styles.caja}>
            <h3>{element.title}</h3>
            <p>{element.content}</p>
            <div className={styles.containerAnchor}>
              <a href={element.link}>{element.buttonText}</a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CajasContenedoras;
