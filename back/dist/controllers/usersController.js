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
exports.userLoginController = exports.userRegister = exports.getUserById = exports.getUsers = void 0;
const userServices_1 = require("../services/userServices");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, userServices_1.getAllUsers)();
    res.status(200).json(users);
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const userById = yield (0, userServices_1.getUserElementForId)(id);
        if (userById) {
            res.status(200).json(userById);
        }
        else {
            res.status(404).json({ message: `El usuario no fue encontrado.` });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getUserById = getUserById;
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, birthdate, nDni, username, password } = req.body;
    const newUserCreated = yield (0, userServices_1.createNewUser)({ name, email, birthdate, nDni, username, password });
    res.status(201).json(newUserCreated);
});
exports.userRegister = userRegister;
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "El nombre de usuario y la contraseña son requeridos" });
        }
        const userLoginResult = yield (0, userServices_1.userLogin)({ username, password });
        if (!userLoginResult) {
            res.status(400).json({ message: "Nombre de Usuario o Contraseña inválidos" });
        }
        else {
            res.status(200).json(userLoginResult);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "credenciales inválidas.") {
                return res.status(400).json({ message: "Nombre de Usuario o Contraseña inválidos" });
            }
            else {
                console.error("Error en userLoginController:", error);
                return res.status(500).json({ message: "Error interno del servidor" });
            }
        }
    }
});
exports.userLoginController = userLoginController;
