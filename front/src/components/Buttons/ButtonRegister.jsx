import styles from './Buttons.module.css'
import { Link } from 'react-router-dom';


const ButtonRegister= () => {
    return (
        <div className={styles.contenedorDeBotones}>
            <Link className={styles.ButtonRegister} to={"/Register"}> Register</Link>
        </div>
    )
}

export default ButtonRegister;