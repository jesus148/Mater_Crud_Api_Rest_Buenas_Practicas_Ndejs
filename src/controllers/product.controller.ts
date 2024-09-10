
// CRUD
// create
// read
// update
// delete

import {Request , Response} from 'express';
import Product from '../models/product.model';
import label from '../label';


// obtener productos 
export const getProducts = async ( req: Request , resp : Response)=>{
    
    // todo ok
    try{
        // lista todo se guarda aqui
        const products = await Product.find();

        // si esta vacio el listado
        if(products.length === 0){
            // respuesta usuario
            resp.status(400).json({
                msg:label.NOT_FOUND, 
                products
            })
            // y si hay productos 
        }else{
            resp.status(200).json({
                msg:label.SUCCESFUL_RESPONSE,
                products
            })
        }


    // error
    }catch(error){

        // mensaje dev
        console.log(error)

        // mensaje usuario
        resp.status(500).json({
            msg:label.MSG_500
        })
    }
}







// obtener por rango de precios 
export const getProductsByPrice = async (req: Request , resp: Response)=>{
    try{
        // obteniendo request del usuario 
        const {min, max} = req.body;
        
        // econtrando productos x precio 
        // {$gte:min} : >= al min
        // $lte : <= al max
        const products= await Product.find({ price:{ $gte:min , $lte:max}})

        // si hay productos 0 
        if(products.length === 0){
            // envio al usuario
            resp.status(204).json({
                msg:label.NOT_FOUND,
                products
            })

            // se ha encontrado proudctos 
        }else{
            // envio al usuario 
            resp.status(200).json({
                msg:label.SUCCESFUL_RESPONSE,
                products
            })
        }
    }catch(error){
                // mensaje dev
                console.log(error)

                // mensaje usuario
                resp.status(500).json({
                    msg:label.MSG_500
                })
    }
}






// metodo para crear el producto 
export const createProduct = async (req : Request , res: Response) =>{


    // todo ok 
    try{
    
    // obteniendo los request de los usuario 
    const { name , description , price , quantity , status} = req.body;


    // creando la instancia 
    const product = new Product({name , description , price , quantity , status})

    // guardando o registrando 
    await  product.save();

    // devolviendo la data 
    res.status(201).json({
        msg:label.SUCCESFUL_RESPONSE,
        product
    })


    // si hay un error 
    }catch(error){  
    // mensaje dev
    console.log(error)

    // mensaje usuario
    res.status(500).json({
    msg:label.MSG_500
    })
    }
}