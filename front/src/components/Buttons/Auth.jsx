
import ButtonLogin from "./ButtonLogin";
import ButtonRegister from "./ButtonRegister";
import styles from "./Buttons.module.css";

const Buttons = ({ onLogin }) => {
  return (
    <div className={styles.buttonsContainer}>
      <ButtonLogin onLogin={onLogin}/>
      <ButtonRegister />
    </div>
  );
};

export default Buttons;
