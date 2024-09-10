
// conexion a bd mongodb

import { connect } from "mongoose"


// conexion a bd es asincrona
const db_connection = async ()=>{
    try{
        // conexion envia el puerto mediante .env
        await connect( process.env.CONNECTION_DB_MONGODB ||  '' );
    }catch( error){
        console.log(error)
    }
}

// exportando 
export default db_connection;