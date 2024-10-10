import styles from "./Cajas.module.css";

const Cajas = ({ elements = [] }) => {
    return (
        <div className={styles.cajaContainer}>
            {elements.length > 0 ? (
                elements.map((elements, index) => (
                    <div key={index} className={styles.caja}>
                        <div className={styles.divs}>
                            <p className={styles.subtitulo}>{elements.primerParrafo}</p>
                            <p>{elements.segundoParrafo}</p>
                        </div>
                        <div className={styles.divs}>
                            <p className={styles.subtitulo}>{elements.tercerParrafo}</p>
                            <p>{elements.cuartoParrafo}</p>
                        </div>
                        <div className={styles.divs}>
                            <p className={styles.subtitulo}>{elements.quintoParrafo}</p>
                            <p>{elements.sextoParrafo}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay elementos disponibles.</p>
            )}
        </div>
    );
};

export default Cajas;
