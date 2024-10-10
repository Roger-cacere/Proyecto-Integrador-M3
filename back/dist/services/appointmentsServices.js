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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = exports.createNewAppointment = exports.getAppointmentElementForId = exports.getAllAppointments = void 0;
const Appointments_1 = require("../entities/Appointments");
const dataSource_1 = require("../config/dataSource");
// const appointments: IAppointments[] = [
//     {
//         "id": 1,
//         "date": "01/02/2020",
//         "time": "12:58",
//         "userId": 1,
//         "status": "active"
//       },
//       {
//         "id": 2,
//         "date": "15/03/2020",
//         "time": "09:30",
//         "userId": 2,
//         "status": "active"
//       },
//       {
//         "id": 3,
//         "date": "20/04/2020",
//         "time": "14:15",
//         "userId": 3,
//         "status": "active"
//       },
//       {
//         "id": 4,
//         "date": "30/05/2020",
//         "time": "11:45",
//         "userId": 4,
//         "status": "active"
//       },
// ];
// let appointmentsId = 1;
const getAllAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    return dataSource_1.AppointmentModel.find({
        relations: {
            user: true
        }
    });
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentElementForId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const turno = dataSource_1.AppointmentModel.findOne({
        where: { id },
        relations: { user: true }
    });
    return turno;
});
exports.getAppointmentElementForId = getAppointmentElementForId;
const createNewAppointment = (dataDto) => __awaiter(void 0, void 0, void 0, function* () {
    // const createNewAppointment = await AppointmentModel.create(dataDto);
    // await AppointmentModel.save(createNewAppointment);
    // const user = await UserModel.findOneBy({
    //     id: dataDto.userId
    // });
    // if(user){
    //     createNewAppointment.user = user;
    //     AppointmentModel.save(createNewAppointment);
    // }
    // return createNewAppointment;
    const queryRunner = dataSource_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    try {
        yield queryRunner.startTransaction();
        const newAppointment = dataSource_1.AppointmentModel.create(dataDto);
        queryRunner.manager.save(newAppointment);
        const user = yield dataSource_1.UserModel.findOneBy({ id: dataDto.userId });
        if (!user)
            throw Error("Usuario inexistente");
        else
            newAppointment.user = user;
        queryRunner.manager.save(newAppointment);
        yield queryRunner.commitTransaction();
        return newAppointment;
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        console.log("Usuario inexistente", error);
    }
    finally {
        yield queryRunner.release();
    }
});
exports.createNewAppointment = createNewAppointment;
const cancelAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield dataSource_1.AppointmentModel.findOneBy({
        id,
    });
    if (appointment) {
        appointment.status = Appointments_1.AppointmentsStatus.CANCELLED;
        yield dataSource_1.AppointmentModel.save(appointment);
    }
    else {
        return null;
    }
    return appointment;
});
exports.cancelAppointment = cancelAppointment;
