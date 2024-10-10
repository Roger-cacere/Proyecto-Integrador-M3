"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsController_1 = require("../controllers/appointmentsController");
// import auth from "../middlewares/auth";
const validateAppointments_1 = __importDefault(require("../middlewares/validateAppointments"));
const validateSchedule_1 = __importDefault(require("../middlewares/validateSchedule"));
const router = (0, express_1.Router)();
router.get("/appointments", appointmentsController_1.getAppointments);
// router.get("/appointment", getAppointment);
router.get("/appointment/:id", appointmentsController_1.getAppointment);
router.post("/appointment/schedule", validateAppointments_1.default, validateSchedule_1.default, appointmentsController_1.createAppointment);
router.put("/appointment/cancel/:id", appointmentsController_1.updateStatusToCancelled);
exports.default = router;
