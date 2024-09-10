



import { NextFunction , Request , Response } from "express";
import label from "../label";
import jwt from "jsonwebtoken";
import Login from '../models/login.model';


// MIDLEWARE DE TOKEN 
// clase para validar el token cuando hacemos una peticion 
// Request : peticion
// Response : respuesta
// NextFunction : te da pase osea luego de validar puede obtener la solicitud del rest

const validateJwt = async (req: Request , res: Response , next : NextFunction)=>{

    try{

        // obteniendo el token del cliente luego de loguearse para obtener peticiones rest
        // Authorization :hsddjkksdklsdklskld > ejemplo de token del usuario guardado en Authorization que es una variable enviado x el cliente
            // queremos el 2 que es el token (hsddjkksdklsdklskld)
        const token = req.header(label.AUTHORIZATION)?.split(' ')[1]

        // si el token esta vacio
        if(!token){
            // retorna al cliente
            return res.status(401).json({
                msg:label.TOKEN_FAILED
            })
        }

        // verificando el token valido
        // comparando el token del cliente con la firma de aca en el backend deñl token 
        // {uid} sacando el id de la coleccion , <any> cualquier tipo de dato
        // const payload = { uid} en el jwt.ts  q carga el uid de la collecion se guarda ahi en el {uid}
        const {uid} = <any> jwt.verify( token , process.env.SECRET_KEY  || '')

        // busca un usuario por {uid} osea por el id de la collecion
        const user = await Login.findById(uid);


        // si el usuario no existe
        if(!user){
            return res.status(401).json({
                msg:label.TOKEN_FAILED
            })
        }


        // el estado del usuario es false se queda  aca
        if(!user._status){
            return res.status(401).json({
                msg:label.TOKEN_FAILED
            })
        }


        // esto permite que el rest que contenga antes este validatetoken tengas permisos que usar el rest 
        // osea continua con el proceso
        next();


    }catch(error){
        // developer msg
        console.log(error);

        //cliente msg
        res.status(500).json({
            msg:label.MSG_500,
            label:label.ERROR
        })
    }

}




// exportando pa usar afuera
export default validateJwt;