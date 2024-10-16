


// CLASE DEL SERVIDOR LOGICA DEL PROOYECTO



import express , {Application , Request , Response} from 'express';
import label from '../label';

import db_connection from '../database/config';
import loguinRouter from '../routes/login.routes';
import userRoutes from '../routes/user.routes';
import productRouter from '../routes/product.routes';
import cors from 'cors';
import { matchedData, query, validationResult } from 'express-validator';
import { errors } from '@typegoose/typegoose';

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


        // metodo de ejemplo
        this.app.get('/get',
            // params > query >jesus
            // escape() : transforma en texto el js
            query('query').notEmpty().escape(),
        (req : Request, res : Response)=>{
            // verifica validaciones
                const result = validationResult(req);
                // si todo ok
                if(result.isEmpty()){

                    // desenvolviendo la data
                    // return res.send(`helloo ,${req.query.query}!`)
                    
                    // data del bodys
                    const data = matchedData(req);//check validator ok
                    // printer del body
                    return res.send(`hello , ${data.query}`)
                }
                // si hay error
                res.send({errors: result.array()})
        });


        // para loguearse
        this.app.use(this.login_path , loguinRouter)
        // para crear un usuario
        this.app.use(this.user_path , userRoutes )
        // para productos crud
        this.app.use(this.product_path , productRouter )
    }





    // Para las cors y formatear data
    // los cors solo se usa para app web o etc . en el postman no es nesecario
    middlewares(){

    // cors para q cualquier front pueda realizar peticiones a tu servidor
    // con esto cualquier front puede hacer peticiones y eso no es recomendable
    // this.app.use(cors())


    // solo ciertos front podra hacer solicitudes en este caso 1 
    const allowedOrigins = process.env.ALLOWED_CORS || '' ; //el port del front en una const
    // origin : definir una ruta del front solo esa podra hacer solicitudes a este back
    this.app.use(cors({origin :allowedOrigins})) //se usa el cors con el origin


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