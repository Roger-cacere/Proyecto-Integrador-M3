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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dataSource_1 = require("./config/dataSource");
const envs_1 = require("./config/envs");
const server_1 = __importDefault(require("./server"));
const preloadData_1 = require("./helpers/preloadData");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Inicializar la conexión a la base de datos
        yield dataSource_1.AppDataSource.initialize();
        console.log("Conexión establecida a la BDD");
        // Precargar datos iniciales
        yield (0, preloadData_1.preloadData)();
        // Precargar citas
        yield (0, preloadData_1.preloadAppointmentsData)();
        // Iniciar el servidor
        server_1.default.listen(envs_1.PORT, () => {
            console.log(`Servidor escuchando en el puerto: ${envs_1.PORT}`);
        });
    }
    catch (error) {
        console.error("Error durante la inicialización:", error);
        process.exit(1); // Salir del proceso con un código de error
    }
});
startServer();
