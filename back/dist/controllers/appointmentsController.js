"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusToCancelled = exports.createAppointment = exports.getAppointment = exports.getAppointments = void 0;
const appointmentsServices_1 = require("../services/appointmentsServices");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield (0, appointmentsServices_1.getAllAppointments)();
        if (appointment.length === 0) {
            res.status(404).json({ message: "No se encontraron los turnos" });
        }
        else {
            res.status(200).json(appointment);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error });
    }
});
exports.getAppointments = getAppointments;
exports.getAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllAppointmentId = parseInt(req.params.id);
    const appointmentForId = yield (0, appointmentsServices_1.getAppointmentElementForId)(getAllAppointmentId);
    if (appointmentForId) {
        res.status(200).json(appointmentForId);
    }
    else {
        res.status(404).json({ message: "El turno no fue encontrado" });
    }
}));
exports.createAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, time, userId } = req.body;
    const newAppointmentCreated = yield (0, appointmentsServices_1.createNewAppointment)({ date, time, userId });
    if (newAppointmentCreated)
        res.status(201).json(newAppointmentCreated);
    else
        res.status(404).json({ error: "No se pudo crear el turno correctamente" });
}));
exports.updateStatusToCancelled = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const appointment = yield (0, appointmentsServices_1.cancelAppointment)(Number(id));
    if (appointment) {
        res.status(200).json("cancelled");
    }
    else {
        res.status(404).json({
            error: "No se pudo cambiar el status correctamente."
        });
    }
}));
