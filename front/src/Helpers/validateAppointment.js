const validateAppointment = (dateTime) => {
    const date = new Date(dateTime);
  
    if (isNaN(date.getTime())) {
      return "Fecha y hora no válidas.";
    }
  
    const day = date.getDay();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;
  
    if (day === 0 || day === 6) {
      return "Los turnos deben solicitarse únicamente de Lunes a Viernes.";
    }
  
    if (!regexValidation.timeRegex.test(time)) {
      return "Los turnos deben solicitarse entre las 09:00 y las 18:00.";
    }
  
    return null;
  };
  