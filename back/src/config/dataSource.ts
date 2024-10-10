import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointments";
import { Credential } from "../entities/Credential";
import { UserLogin } from "../entities/Login";
import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DB  } from "./envs";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DB, 
    entities: [User, Appointment, Credential, UserLogin],
    synchronize: true,
    logging: false
})

export const UserModel = AppDataSource.getRepository(User);
export const CredentialModel = AppDataSource.getRepository(Credential);
export const AppointmentModel = AppDataSource.getRepository(Appointment);