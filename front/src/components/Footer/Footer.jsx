import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <>
      <footer>
        <div className={styles.footerContainer}>
          <div className={styles.logo}>
            <svg
              className={styles.dollar}
              data-id="1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="12" x="2" y="6" rx="2"></rect>
              <circle cx="12" cy="12" r="2"></circle>
              <path d="M6 12h.01M18 12h.01"></path>
            </svg>
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