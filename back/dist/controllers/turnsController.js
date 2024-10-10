"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusToCancelled = exports.createTurn = exports.getAppointment = exports.getAppointments = void 0;
const getAppointments = (req, res) => {
    res.send("Obtener el listado de todos los turnos de todos los usuarios.");
};
exports.getAppointments = getAppointments;
const getAppointment = (req, res) => {
    res.send("Obtener el detalle de un turno específico.");
};
exports.getAppointment = getAppointment;
const createTurn = (req, res) => {
    res.send("Agendar un nuevo turno.");
};
exports.createTurn = createTurn;
const updateStatusToCancelled = (req, res) => {
    res.send("Cambiar el estatus de un turno a “cancelled”.");
};
exports.updateStatusToCancelled = updateStatusToCancelled;
