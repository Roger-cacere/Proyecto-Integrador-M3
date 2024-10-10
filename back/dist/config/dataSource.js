"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModel = exports.CredentialModel = exports.UserModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Appointments_1 = require("../entities/Appointments");
const Credential_1 = require("../entities/Credential");
const Login_1 = require("../entities/Login");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Roger.315",
    database: "miproyecto",
    // dropSchema: true,
    entities: [User_1.User, Appointments_1.Appointment, Credential_1.Credential, Login_1.UserLogin],
    synchronize: true,
    logging: false
});
exports.UserModel = exports.AppDataSource.getRepository(User_1.User);
exports.CredentialModel = exports.AppDataSource.getRepository(Credential_1.Credential);
exports.AppointmentModel = exports.AppDataSource.getRepository(Appointments_1.Appointment);
