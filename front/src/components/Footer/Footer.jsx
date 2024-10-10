import styles from "./Footer.module.css"
const Footer = () => {
  return (
    <>
      <footer>
        <div className={styles.footerContainer}>
          <div className={styles.logo}>
            <span>Banco Stitch</span>
          </div>
          <div className={styles.footerInformation}>
            <nav className={styles.information}>
              <a href="#">Privacidad</a>
              <a href="#">Términos</a>
              <a href="#">Contacto</a>
            </nav>
          </div>
        </div>
        <div className={styles.text}>
          <span>© 2024 Powered By Roger Caceres</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;