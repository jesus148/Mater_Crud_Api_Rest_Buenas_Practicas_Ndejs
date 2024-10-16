
import {NextFunction, Request , Response} from 'express';
import label from '../label';



// metodo middleware valida si los campos no estan vacio

const valideteFieldEmpty = (req : Request , resp : Response ,
    next : NextFunction
)=>{



    // todo ok 
    try{

        // verificando si exiten campos y tienen valor 
        if(!req.body.username || req.body.username === ""){
            return resp.status(404).json({
                msg: 'username requerido'
            });
        }else if(!req.body.password || req.body.password === ""){
            return resp.status(404).json({
                msg:'password requerido'
            })
        }else if(!req.body.role || req.body.role === ""){
            return resp.status(404).json({
                msg:'role requerido'
            })
        }


        // todo ok tienes acceso a la ruta 
        next();

    // si hay error 
    }catch(error){

        // mensaje dev 
        console.log(error)

        // mensaje front
        resp.status(500).json({
            msg:label.MSG_500
        })

    }


}


export{
    valideteFieldEmpty
}
