



import { NextFunction , Request , Response } from "express";
import label from "../label";
import jwt from "jsonwebtoken";
import Login from '../models/login.model';


// MIDLEWARE DE TOKEN 
// clase para validar el token cuando hacemos una peticion 
// Request : peticion
// Response : respuesta
// NextFunction : te da pase osea luego de validar puede obtener la solicitud del rest

// metodo          
// roleToValidate: es el role q queremos validar , sera opcional se envie o no el parametro de rol
const validateJwt = (roleToValidate? : string) =>{ 
    return  async (req: Request , res: Response , next : NextFunction)=>{

        try{
    
            // obteniendo el token del cliente luego de loguearse para obtener peticiones rest
            // Authorization :hsddjkksdklsdklskld > ejemplo de token del usuario guardado en Authorization que es una variable enviado x el cliente
                // queremos el 2 que es el token (hsddjkksdklsdklskld)
    
            // const token = req.header(label.AUTHORIZATION)?.split(' ')[1]
            
    
            // usando sin el bearer , obtiene el valor del key AUTHORIZATION
            const token = req.header(label.AUTHORIZATION)
    
            
    
    
            // si el token esta vacio
            if(!token){
                // retorna al cliente
                return res.status(401).json({
                    msg:label.TOKEN_FAILED
                })
            }
    
            // verificando el token valido
            // comparando el token del cliente con la firma de aca en el backend del token 
            // {uid} sacando el id de la coleccion , <any> cualquier tipo de dato
            // const payload = {uid} en el jwt.ts  q carga el uid de la collecion se guarda ahi en el {uid}
            // role : obtenemos el role tambien 
            const {uid , role} = <any> jwt.verify( token , process.env.SECRET_KEY  || '')
    
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


            // validaciones usarios q no tengan el rol pa hacer una acccion y tampoco sean admins
            // user._role : rol del usuario q se logueo es diferente al rol q nesecita el usuario para realizar esta accion que es el roleToValidate
            // roleToValidate : rol que nesecita pa hacer una accion y tampoco es admin
            // roleToValidate : tenga un valor y no este vacio
            if(user._role !== roleToValidate && user._role !== "ADMIN" && roleToValidate){
                return res.status(401).json({
                    msg:label.ROLE_NOT_PERMISSIONS,
                    role:user._role
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

}


// tip:
// https://jwt.io/
// pagina para desarmar y ver la estructura de un token enviado del front


// exportando pa usar afuera
export default validateJwt;