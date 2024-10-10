import { useDispatch, useSelector } from "react-redux";
import { setUserAppointments } from "../../redux/reducer";
import Appointment from "../../components/Appointments/Appointment";
import NotAppointment from "../../components/Appointments/NotAppointment";
import { useEffect } from "react";
import styles from "./MisTurnos.module.css";
import axios from "axios";

const MisTurnos = () => {
  const dispatch = useDispatch();
  const userAppointments = useSelector((state) => state.userSlice.userAppointments);
  const user = useSelector((state) => state.userSlice.user);

  useEffect(() => {
    if (user && user.user.id) {
      fetchAppointments();
    }
  }, [dispatch, user]);

  const fetchAppointments = () => {
    const userId = parseInt(user.user.id, 10);
    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        dispatch(setUserAppointments({ appointments: res.data.appointments }));
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  };

  return (
    <div className={styles.body}>
      {user ? (
        <>
          <section className={styles.contenedor}>
            <div className={styles.container}>
              <div className={styles.sectionOne}>
                <h1>Turnos Solicitados</h1>
                <p>Aquí puedes ver los turnos que has solicitado.</p>
                <div className={styles.buttonLogin}>
                  <a className={styles.button}>Ver Turnos</a>
                </div>
              </div>
              <div className={styles.sectionSecond}>
                <img
                  className={styles.img}
                  src="https://img.freepik.com/vector-premium/personas-stand-banco-escritorio-operador-esperando-turno-realizar-operaciones-financieras_1016-5038.jpg"
                  alt="banco-turnos"
                />
              </div>
            </div>
          </section>

          <section>
            <div style={{ padding: '80px 0' }}>
              <h2>Turnos Disponibles</h2>
              <div className={styles.contenedorGeneral}>
                {userAppointments.length > 0 ? (
                  userAppointments.map((turno) => (
                    <Appointment
                      key={turno.id}
                      id={turno.id}
                      date={turno.date}
                      time={turno.time}
                      status={turno.status}
                    />
                  ))
                ) : (
                  <NotAppointment/>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <p>No estás logueado.</p>
      )}
    </div>
  );
};

export default MisTurnos;
