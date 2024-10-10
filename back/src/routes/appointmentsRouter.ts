import { Router } from "express";
import { getAppointments, getAppointment, createAppointment, updateStatusToCancelled } from "../controllers/appointmentsController"

import validateAppointment from "../middlewares/validateAppointments";
import validateSchedule from "../middlewares/validateSchedule";

const router: Router = Router();

router.get("/appointments", getAppointments);

router.get("/appointment/:id", getAppointment);

router.post("/appointment/schedule", validateAppointment, validateSchedule, createAppointment);

router.put("/appointment/cancel/:id", updateStatusToCancelled);

export default router; 