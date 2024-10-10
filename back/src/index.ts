import "reflect-metadata"
import { AppDataSource } from "./config/dataSource";
import { PORT } from "./config/envs";
import server from "./server";
import { preloadAppointmentsData, preloadData } from "./helpers/preloadData";


const startServer = async () => {
    try {
      // Inicializar la conexión a la base de datos
      await AppDataSource.initialize();
      console.log("Conexión establecida a la BDD");
  
      // Precargar datos iniciales
      await preloadData();
  
      // Precargar citas
      await preloadAppointmentsData();
  
      // Iniciar el servidor
      server.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto: ${PORT}`);
      });
  
    } catch (error) {
      console.error("Error durante la inicialización:", error);
      process.exit(1); // Salir del proceso con un código de error
    }
  };
  
  startServer();