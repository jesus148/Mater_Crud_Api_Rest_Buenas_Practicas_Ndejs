
import { NextFunction  , Request , response, Response} from 'express';
import {validationResult} from 'express-validator';
import label from '../label';

// controller para validar las request osea la peticiones

const validateField = (req : Request , res : Response , next : NextFunction) =>{

    try{


        // Extrae los errores de validación de la solicitud HTTP (req). Este método verifica si alguno de los middlewares de validación (por ejemplo, chequeo de campos como email, password, etc.) ha detectado errores.
        const errors = validationResult(req);


        // verificando si hay errores
        // errors.isEmpty(): Si no se detectan errores, isEmpty() será true. Si hay errores, será false.
        if(!errors.isEmpty){
            // respuesta al usuario
            return res.status(400).json({
                msg:label.EMPTY_FIELD,
                errors
            })
        }   


        // todo ok tienes acceso a la ruta 
        next();


        // error
    }catch(error){
        // error dev
        console.log(error);

        // error usuario
        res.status(500).json({
            msg:label.MSG_500 , 
            response : label.ERROR
        })
    }

}


// exportando
export {
    validateField
}