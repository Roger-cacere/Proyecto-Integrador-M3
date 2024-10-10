import IAppointments from "../interfaces/IAppoitments";
import IAppointmentDto  from "../dto/appointmentDto"
import IAppointmentDtoTwo from "../dto/appointmentDtoTwo";
import { Appointment, AppointmentsStatus } from "../entities/Appointments";
import { AppDataSource, AppointmentModel, UserModel } from "../config/dataSource";

export const getAllAppointments = async():Promise<Appointment[]> => {
    return AppointmentModel.find({
        relations: {
            user: true
        }
    })
}

export const getAppointmentElementForId = async(id: number): Promise<Appointment | null> => {
    const turno = AppointmentModel.findOne({
        where: { id },
        relations: { user: true }
    })

    return turno;
}

export const createNewAppointment = async(dataDto: IAppointmentDtoTwo)=> {

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
        await queryRunner.startTransaction();
        const newAppointment = AppointmentModel.create(dataDto);
        queryRunner.manager.save(newAppointment);
    
        const user = await UserModel.findOneBy({ id: dataDto.userId });
    
        if(!user) throw Error("Usuario inexistente");
        else newAppointment.user = user;
    
        queryRunner.manager.save(newAppointment);
        await queryRunner.commitTransaction()
        return newAppointment;

    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.log("Usuario inexistente", error);
        
    }finally{
        await queryRunner.release()
    }



}

export const cancelAppointment = async(id: number) => {

    const appointment = await AppointmentModel.findOneBy({
        id,
    })

    if(appointment){
        appointment.status = AppointmentsStatus.CANCELLED
        await AppointmentModel.save(appointment);
    }else{
        return null;
        
    } 

    return appointment;
}