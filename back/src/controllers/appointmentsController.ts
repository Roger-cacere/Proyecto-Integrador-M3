import { Request, Response } from "express";
import { getAllAppointments, getAppointmentElementForId, createNewAppointment, cancelAppointment } from "../services/appointmentsServices";
import { Appointment } from "../entities/Appointments";
import catchAsync from "../utils/catchAsync";

export const getAppointments = async(req: Request, res: Response) => {
    try {
        const appointment: Appointment[] = await getAllAppointments();
        
        if(appointment.length === 0){
            res.status(404).json({ message: "No se encontraron los turnos" })

        }else{
            res.status(200).json(appointment);
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor",  error})
    }
   
}

export const getAppointment =  catchAsync(async(req: Request, res: Response) => {
    const getAllAppointmentId = parseInt(req.params.id);
        const appointmentForId = await getAppointmentElementForId(getAllAppointmentId);
        if(appointmentForId){
            res.status(200).json(appointmentForId)
        }else{
            res.status(404).json({message: "El turno no fue encontrado"})
        }
})

export const createAppointment = catchAsync(async(req: Request, res: Response) => {
    const { date, time, userId } = req.body;
    const newAppointmentCreated: Appointment | undefined = await createNewAppointment({ date, time, userId});
    if(newAppointmentCreated) res.status(201).json(newAppointmentCreated);
    else res.status(404).json({ error: "No se pudo crear el turno correctamente" })
})

export const updateStatusToCancelled = catchAsync(async(req: Request, res: Response) => {

        const { id } = req.params
        const appointment = await cancelAppointment(Number(id))

        if(appointment){
            res.status(200).json("cancelled")
        }else {
            res.status(404).json({
                error: "No se pudo cambiar el status correctamente."
            })
        }
})