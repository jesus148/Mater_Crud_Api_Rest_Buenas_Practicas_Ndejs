
import dotentv from 'dotenv';
import Server from './src/models/server.model';



// ESTO LEVANTA EL SERVIDOR

// configurando variables entorno globales
// configiguramos dotenv > esto usara el puerto .env
// con esto se usara el .env en todo el proyecto
dotentv.config();


try{
    // servidor instancia
    const server = new Server();
    



    // si hay error
} catch(error){
    console.log(error)
}