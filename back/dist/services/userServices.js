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
exports.userLogin = exports.createNewUser = exports.getUserElementForId = exports.getAllUsers = void 0;
const dataSource_1 = require("../config/dataSource");
const credentialServices_1 = require("./credentialServices");
// const user:IUser[] = [
//     {
//         id: 10,
//         name: 'juan',
//         email: 'juan@mail.com',
//         birthdate: '10/02/2001',
//         nDni: 123456,
//         credentialsId: 1
//     }
// ];
// let id = 1;
//Devuelve el arreglo de los usuarios
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield dataSource_1.UserModel.find({
        relations: {
            appointments: true
        }
    });
});
exports.getAllUsers = getAllUsers;
//Devuelve el elemento por id
const getUserElementForId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield dataSource_1.UserModel.findOne({
        where: { id },
        relations: { appointments: true }
    });
    return results;
});
exports.getUserElementForId = getUserElementForId;
//Crea el usuario con su correspondiente par de credenciales
const createNewUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, nDni, username, password } = userData;
    const newUser = yield dataSource_1.UserModel.create({ name, email, birthdate, nDni });
    const newCredential = yield (0, credentialServices_1.createCredential)(username, password);
    newUser.credentials = newCredential;
    yield dataSource_1.UserModel.save(newUser);
    return newUser;
});
exports.createNewUser = createNewUser;
const userLogin = (credentialData) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = yield (0, credentialServices_1.validateUser)(credentialData);
    const { id } = credentials;
    const userCredentials = yield dataSource_1.UserModel.findOneBy({ id });
    if (userCredentials) {
        return { login: true, userCredentials };
    }
    else {
        return null;
    }
});
exports.userLogin = userLogin;
