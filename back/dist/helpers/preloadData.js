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
exports.preloadAppointmentsData = exports.preloadData = void 0;
const dataSource_1 = require("../config/dataSource");
const dataSource_2 = require("../config/dataSource");
const users = [
    {
        name: "Lautaro",
        email: "lauti@mail.com",
        birthdate: "24/04/2004",
        nDni: 123456,
        credentialsId: 1,
    },
    {
        name: "Maria",
        email: "maria@mail.com",
        birthdate: "22/04/2004",
        nDni: 123454,
        credentialsId: 2,
    },
    {
        name: "Juan",
        email: "juan@mail.com",
        birthdate: "20/04/2004",
        nDni: 12453,
        credentialsId: 3,
    },
];
const credentials = [
    {
        username: "lauti12",
        password: "123",
        id: 1,
    },
    {
        username: "maria10",
        password: "345",
        id: 2,
    },
    {
        username: "juan11",
        password: "678",
        id: 3,
    },
];
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
const appointments = [
    {
        date: formatDate(new Date(2024, 0)), // Enero es 0
        time: "12:58",
        userId: 1
    },
    {
        date: formatDate(new Date(2024, 2)), // Marzo es 2
        time: "09:30",
        userId: 2
    },
    {
        date: formatDate(new Date(2024, 5)), // Junio es 5
        time: "14:15",
        userId: 3
    },
];
// const appointments = [
//   {
//     date: new Date(2024, 0).toISOString().split('T').reverse()[0],
//     time: "12:58",
//     userId: 1
//   },
//   {
//     date: new Date(2024, 2).toISOString().split('T').reverse()[0],
//     time: "09:30",
//     userId: 2
//   },
//   {
//     date: new Date(2024, 5).toISOString().split('T').reverse()[0],
//     time: "14:15",
//     userId: 3
//   },
// ];
const preloadData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield dataSource_1.AppDataSource.manager.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        //Buscamos un Usuario
        const user = yield dataSource_1.UserModel.find();
        //Si encontramos un usuario, no hacemos la precarga de los datos
        if (user.length)
            return console.log("No se hizo la precarga de datos de usuarios debido a que ya hay datos creados");
        //Si no encontramos un usuario, creamos los usuarios y las credenciales correspondientes
        const newUser = dataSource_1.UserModel.create(users);
        const newCredential = dataSource_2.CredentialModel.create(credentials);
        //Guardamos las credenciales
        yield transactionalEntityManager.save(newCredential);
        //A cada usuario les asignamos sus credenciales
        newUser.forEach((user, index) => {
            user.credentials = newCredential[index];
        });
        //Guardamos los usuarios creados
        yield transactionalEntityManager.save(newUser);
        console.log("Precarga de datos de usuarios realizada con éxito");
    }));
});
exports.preloadData = preloadData;
// export const preloadAppointments = async () => {
//   try {
//     await AppDataSource.manager.transaction(
//       async (transactionalEntityManager) => {
//         const existingAppointment = await AppointmentModel.find();
//         if (existingAppointment.length > 0) {
//           console.log(
//             "La Precarga de datos de Appointments no fue realizada con éxito debido a que ya hay turnos disponibles"
//           );
//           return;
//         }
//         for (const appointment of appointments) {
//           const newAppointment = AppointmentModel.create(appointment);
//           const user = await UserModel.findOneBy({ id: appointment.userId });
//           if (user) {
//             newAppointment.user = user;
//             transactionalEntityManager.save(newAppointment);
//           } else {
//             //   throw Error("Usuario inexistente");
//             console.log("no se pudo asignar");
//           }
//           console.log("Precarga de datos de Appointments realizada con éxito");
//         }
//       }
//     );
//   } catch (error) {
//     console.error("Error durante la precarga de datos de Appointments:", error);
//   }
// };
const preloadAppointmentsData = () => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = dataSource_1.AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    const existingAppointment = yield dataSource_1.AppointmentModel.find();
    if (existingAppointment.length > 0) {
        console.log("La Precarga de datos de Appointments no fue realizada con éxito debido a que ya hay turnos disponibles");
        return;
    }
    const promises = appointments.map((appointment) => __awaiter(void 0, void 0, void 0, function* () {
        const newAppointment = dataSource_1.AppointmentModel.create(appointment);
        yield queryRunner.manager.save(newAppointment);
        const user = yield dataSource_1.UserModel.findOneBy({ id: appointment.userId });
        if (!user) {
            throw Error("Usuario inexistente");
        }
        else {
            newAppointment.user = user;
            yield queryRunner.manager.save(newAppointment);
        }
    }));
    try {
        yield queryRunner.startTransaction();
        yield Promise.all(promises);
        console.log("Precarga de datos de Appointments realizada con éxito");
        yield queryRunner.commitTransaction();
    }
    catch (error) {
        console.log("Error durante la precarga de datos de Appointments", error);
        yield queryRunner.rollbackTransaction();
        console.log("Ha finalizado el intento de precarga");
    }
    finally {
        yield queryRunner.release();
    }
});
exports.preloadAppointmentsData = preloadAppointmentsData;
