import styles from './Buttons.module.css'
import { Link } from 'react-router-dom'

const ButtonLogin = () => {
    return (
        <div className={styles.contenedorDeBotones}>
            <Link className={styles.ButtonLogin} to="/login">Login</Link>
        </div>
    )
}

export default ButtonLogin;