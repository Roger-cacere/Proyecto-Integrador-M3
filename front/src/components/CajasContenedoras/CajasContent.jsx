
import Cajas from "./Cajas"
import styles from "./Cajas.module.css"

const CajasContent = ( { elements }) => {
    return (
        <>
        <section className={styles.contenedor}>
            <div className={styles.contenedorCards}>
                <Cajas elements={elements} />
            </div>
        </section>
        </>
    )
}

export default CajasContent;