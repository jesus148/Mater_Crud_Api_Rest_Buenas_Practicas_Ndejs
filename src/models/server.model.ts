


// CLASE DEL SERVIDOR LOGICA DEL PROOYECTO



import express , {Application , Request , Response} from 'express';
import label from '../label';

import db_connection from '../database/config';
import loguinRouter from '../routes/login.routes';
import userRoutes from '../routes/user.routes';
import productRouter from '../routes/product.routes';
import cors from 'cors';

class Server{

    // aplicacion
    private app: Application
    // puerto
    private port:string


    // paths de rutas
    private login_path:string
    private user_path:string
    private product_path:string




    // inicia
    constructor(){


        // REASIGNANDO 

        // aplicacion express
        this.app = express();   
        
        // reasignando rutas
        // localhost:300+
        this.login_path='/api/login'
        this.user_path='/api/users'
        this.product_path='/api/products'

        // puerto aplicacion 
        // process.env.PORT  : se ejecutara en este puerto
        // "3001" : en caso no exista en el PORT se ejecuta esto
        this.port =  process.env.PORT ||  '3001' ;

        // estructura de ejecucion 

        this.listen();//llama escuchar el puerto solo usar 1 vez este metodo


        // para interceptar las peticiones
        this.middlewares()
        
        // ejecutando los router
        this.router();
        
        // conexion a bd
        this.connectDB();   
    }


    // para ejecutar el puerto 
    listen(){
        // this.app.listen(this.port , () => console.log(`server running on port 3000`));
        this.app.listen(this.port , () => console.log(label.LISTEN_SERVER + " " + this.port));
    }


    // metodo para los router
    router(){


        // para loguearse
        this.app.use(this.login_path , loguinRouter)
        // para crear un usuario
        this.app.use(this.user_path , userRoutes )
        // para productos crud
        this.app.use(this.product_path , productRouter )
    }





    // Para las cors y formatear data
    middlewares(){
    // cors para q cualquier front pueda realizar peticiones a tu servidor
    this.app.use(cors())
    // formatea los request y los response en un formato json para el cliente o el servidor
        this.app.use(express.json())
    }



    



    // conexion a la bd
    async connectDB(){
        await db_connection();
    }





}




// exportacion por default
// permitiendo que otros archivos la importen y utilicen.
export default Server;