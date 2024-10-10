import {
  AppDataSource,
  AppointmentModel,
  UserModel,
} from "../config/dataSource";
import { CredentialModel } from "../config/dataSource";

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

const formatDate = (date: Date):string => {
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

export const preloadData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      //Buscamos un Usuario
      const user = await UserModel.find();

      //Si encontramos un usuario, no hacemos la precarga de los datos
      if (user.length)
        return console.log(
          "No se hizo la precarga de datos de usuarios debido a que ya hay datos creados"
        );

      //Si no encontramos un usuario, creamos los usuarios y las credenciales correspondientes
      const newUser = UserModel.create(users);
      const newCredential = CredentialModel.create(credentials);

      //Guardamos las credenciales
      await transactionalEntityManager.save(newCredential);

      //A cada usuario les asignamos sus credenciales
      newUser.forEach((user, index) => {
        user.credentials = newCredential[index];
      });

      //Guardamos los usuarios creados
      await transactionalEntityManager.save(newUser);

      console.log("Precarga de datos de usuarios realizada con éxito");
    }
  );
};

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

export const preloadAppointmentsData = async () => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  const existingAppointment = await AppointmentModel.find();

  if (existingAppointment.length > 0) {
    console.log(
      "La Precarga de datos de Appointments no fue realizada con éxito debido a que ya hay turnos disponibles"
    );
    return;
  }

  const promises = appointments.map(async (appointment) => {
    const newAppointment = AppointmentModel.create(appointment);
    await queryRunner.manager.save(newAppointment);

    const user = await UserModel.findOneBy({ id: appointment.userId });

    if (!user) {
      throw Error("Usuario inexistente");
    } else {
      newAppointment.user = user;
      await queryRunner.manager.save(newAppointment);
    }
  });

  try {
    await queryRunner.startTransaction();
    await Promise.all(promises);

    console.log("Precarga de datos de Appointments realizada con éxito");
    await queryRunner.commitTransaction();
  } catch (error) {
    console.log("Error durante la precarga de datos de Appointments", error);
    await queryRunner.rollbackTransaction()
    console.log("Ha finalizado el intento de precarga");
} finally {
    await queryRunner.release();
  }
};
