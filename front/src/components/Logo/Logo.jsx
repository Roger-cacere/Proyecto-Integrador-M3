import styles from "./Logo.module.css"

const Logo = () =>{
    return (
        <div className={styles.contenedorLogo}>
            <a href="#" className={styles.logo}>
              Banco Stitch
            </a>
          </div>
    )
}

export default Logo;