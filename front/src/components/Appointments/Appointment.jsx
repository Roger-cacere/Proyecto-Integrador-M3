import { useDispatch, useSelector } from "react-redux";
import { setUserAppointments } from "../../redux/reducer";
import styles from "./Appointment.module.css";
import axios from "axios";

const cancelAppointment = async (appointmentId, appointmentDate, userAppointments, dispatch) => {
  try {
    const today = new Date();
    const appointmentDay = new Date(appointmentDate);

    today.setHours(0, 0, 0, 0);
    appointmentDay.setHours(0, 0, 0, 0);

    if (appointmentDay <= today) {
      alert("No puedes cancelar un turno el mismo día o después de la fecha del turno.");
      return;
    }

    await axios.put(`http://localhost:3000/appointment/cancel/${appointmentId}`, null, {});

    dispatch(setUserAppointments({
      appointments: userAppointments.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: "cancelled" }
          : appointment
      )
    }));

    alert("Turno cancelado con éxito");
  } catch (error) {
    alert("No se pudo cancelar el turno: " + (error.response?.data.message || error.message));
  }
};

const Appointment = ({ id, date, time, status }) => {
  const dispatch = useDispatch();
  const userAppointments = useSelector((state) => state.userSlice.userAppointments);

  const cancel = (id, date) => {
    cancelAppointment(id, date, userAppointments, dispatch);
  };

  return (
    <div className={styles.container}>
      <p>Fecha:</p>
      <p className={styles.hijos}>{date}</p>
      <p>Hora:</p>
      <p className={styles.hijos}>{time}</p>
      <p>Estado:</p>
      <div
        className={`${styles.state} ${
          status === "active" ? styles.active : styles.cancelled
        } `}
      >
        {status}
      </div>
      <button
        onClick={() => cancel(id, date)}
        className={`${styles.button} ${status !== "active" ? styles.disabled : ""}`}
        disabled={status !== "active"}
      >
        {status === "active" ? "Cancelar Turno" : "Turno Cancelado"}
      </button>
    </div>
  );
};

export default Appointment;
