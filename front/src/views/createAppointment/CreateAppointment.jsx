import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from './CreateAppointment.module.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const validateDateAndTime = (values) => {
  const errors = {};
  const selectedDate = new Date(values.date);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const selectedDay = selectedDate.getDay();
  const selectedTime = values.time;

  if (!values.date) {
    errors.date = "La fecha es requerida";
  } else if (selectedDate < currentDate) {
    errors.date = "No puedes seleccionar una fecha anterior a hoy";
  } else if (selectedDay === 0 || selectedDay === 6) {
    errors.date = "Los turnos deben solicitarse los días de semana";
  }

  if (!values.time) {
    errors.time = "La hora es requerida";
  } else if (selectedTime && (selectedTime < "09:00" || selectedTime > "18:00")) {
    errors.time = "Los turnos deben solicitarse entre las 09:00 y las 18:00 horas";
  }

  return errors;
};

const CreateAppointment = () => {
  const user = useSelector((state) => state.userSlice.user);

  return (
    <>
      {user ? (
        <Formik
          initialValues={{ date: "", time: "" }}
          validate={validateDateAndTime}
          onSubmit={async (values, { setSubmitting }) => {
            const formattedDate = formatDate(values.date);
            const formattedValues = {
              ...values,
              date: formattedDate,
              userId: user.user.id,
            }; 

            try {
              const response = await axios.post(
                "http://localhost:3000/appointment/schedule",
                formattedValues
              ); 
              alert("Se registró el Turno con éxito");

            } catch (error) {
              console.error(
                "Error details:",
                error.response?.data || error.message
              );
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form className={styles.formContainer}>
              <div className={styles.title}>Crear Turno</div>
              <div className={styles.subtitle}>
                Selecciona la fecha y hora de tu turno.
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Fecha</label>
                <Field
                  type="date"
                  name="date"
                  className={styles.input}
                />
                {errors.date && (
                  <div className={styles.error}>
                    <p>{errors.date}</p>
                  </div>
                )}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Hora</label>
                <Field
                  type="time"
                  name="time"
                  className={styles.input}
                />
                {errors.time && (
                  <div className={styles.error}>
                    <p>{errors.time}</p>
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? "Enviando..." : "Enviar Turno"}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <p>No estás logueado.</p>
      )}
    </>
  );
};

export default CreateAppointment;
