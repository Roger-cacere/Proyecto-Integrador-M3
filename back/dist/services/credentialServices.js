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
exports.validateUser = exports.createCredential = void 0;
const dataSource_1 = require("../config/dataSource");
const CredentialRepository_1 = require("../repositories/CredentialRepository");
// const credential:ICredential[] = [];
// let id = 1;
const createCredential = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const newCredential = dataSource_1.CredentialModel.create({ username, password });
    yield dataSource_1.CredentialModel.save(newCredential);
    return newCredential;
});
exports.createCredential = createCredential;
const validateUser = (credentialData) => __awaiter(void 0, void 0, void 0, function* () {
    const userCredential = yield CredentialRepository_1.validateCredentialsRepository.findCredentials(credentialData.username, credentialData.password);
    if (!userCredential)
        throw Error("No se encontró un usuario con esas credenciales.");
    else
        return userCredential;
});
exports.validateUser = validateUser;
