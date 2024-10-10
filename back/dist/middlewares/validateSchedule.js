"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openingHour = 9;
const closingHour = 18;
const validateSchedule = (req, res, next) => {
    const { date, time } = req.body;
    const [day, month, year] = date.split('/').map(Number);
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const appointmentDate = new Date(formattedDate);
    const appointmentTime = parseInt(time.split(':')[0], 10);
    const dayOfWeek = appointmentDate.getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return res.status(400).json({ error: "No se puede agendar un turno los fines de semana." });
    }
    if (appointmentTime < openingHour || appointmentTime >= closingHour) {
        return res.status(400).json({ error: `Los turnos deben ser agendados entre las ${openingHour}:00 y las ${closingHour}:00.` });
    }
    next();
};
exports.default = validateSchedule;
