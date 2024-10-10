import { AppointmentsStatus } from "../entities/Appointments";

interface IAppointmentDto {
    date: string,
    time: string,
    userId: number,
    status: AppointmentsStatus.ACTIVE
}

export default IAppointmentDto;