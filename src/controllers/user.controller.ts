


import {Request , Response} from 'express';
import Login from '../models/login.model';
import bcrypt from 'bcryptjs';
import label from '../label';

// controller para crear el usuario



// exportando nombrada varias
export const createUser = async (req : Request , resp: Response) => {


    try{

        // desenvolsando el request
        const {username , password , role }=req.body;
        
        // creando la instancia 
        const user = new Login({username , password , role})


        // // genera la sal
        // bcrypt.genSaltSync() : genera directmante el salt pa la contraseña 
        //   se guarda en la variable el salt , genera un numero de > o caracteres
        const salt = bcrypt.genSaltSync()

        // encripta la contraseña
        // user._password : user creado usa el metodo set _password se seteara con el password encriptado con hash
        user._password = bcrypt.hashSync(password , salt);


        // registrando en la bd , la instancia tambien tiene acceso al mongosse
        await user.save()


        // respuesta al usuario
        resp.status(201).json({
            // variable       mensjae
            msg:label.SUCCESFUL_REGISTER,
            username: user._username   //nombre del usuario de la instancia
        })




    }catch(error){
        
        // mensaje dev
        console.log(error);

        // menssaje usuario
        resp.status(500).json({
            msg:label.MSG_500,
            response:label.ERROR
        })

        
    }
}