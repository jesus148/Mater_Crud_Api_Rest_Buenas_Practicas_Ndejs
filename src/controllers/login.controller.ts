
import { Request ,  response,  Response } from 'express';
import LoginModel from '../models/login.model';
import label from '../label';
import bcrypt from  'bcryptjs';
import getJwt from '../helpers/jwt';

// Logica 






// controller LOGUIN 


const login = async ( req: Request , res: Response)=>{
    // manejando errores

    // ok
    try{
        // destructurando la parte del cliente
        const {username , password} = req.body;

        // encontrando el usuario logeado a partir de su username el primero o unico
        // username : buscar por el username = en el modelo
        // si lo encuentra trae todos sus propiedade y metodos
        const user = await LoginModel.findOne({username})

        // si no existe
        // x buenas practicas no retornes que ha fallado solo dale una pista
        if(!user){
            // destruye e informa al cliente
            return res.status(400).json({
                msg:label.MSG_400,
                response:label.FALIED_LOGIN
            })
        }

        // verificar el estado
        // si el usuario tiene el estado activo , osea si no tiene estado se queda aca
        // x buenas practicas no retornes que ha fallado solo dale una pista
        if(!user._status){
            // retorna y finaliza 
            return res.status(400).json({
                msg:label.MSG_400,
                response:label.STATUS_USER
            })
        }


        // comparamos las contraseñas
        // user._password : metodo clase guia con el objeto encontrado
        const validPassword=bcrypt.compareSync( password , user._password);

        // si no concuerda la contraseña
        // x buenas practicas no retornes que ha fallado solo dale una pista
        if(!validPassword){
            return res.status(400).json({
                msg:label.MSG_400,
                response: label.FALIED_LOGIN
            })
        }



        // creando un token 
        // user._id del usuario clase modelo toma el _id de la coleccion no esta en la clase modelo y lo convierte a string
        // creacion del token
        const token = await getJwt(String(user._id))

        // todo exitoso
        res.status(200).json({
            // mensajes de confirmacion
            msg:label.SUCCESFULLOGIN,
            username:user._username, 
            token,  //envio del token
            expiresIn:3600  //tiempo de expiracion 3600 segundo equivale a 1 hora
        })


        // error
    }catch(err){

        // mostrando error alos programdores , solo ve en el backend
        console.log(err);

        // mostrando errores a los clientes
        return res.status(500).json({
            msg:label.MSG_500,
            response:label.ERROR
        })
    }
}



// exportando el metodo login o default solo 1
export default login;