import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointments";
import { Credential } from "../entities/Credential";
import { UserLogin } from "../entities/Login";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Roger.315",
    database: "miproyecto", 
    entities: [User, Appointment, Credential, UserLogin],
    synchronize: true,
    logging: false
})

export const UserModel = AppDataSource.getRepository(User);
export const CredentialModel = AppDataSource.getRepository(Credential);
export const AppointmentModel = AppDataSource.getRepository(Appointment);