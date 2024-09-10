
// CRUD
// create
// read
// update
// delete

import {Request , Response} from 'express';
import Product from '../models/product.model';
import label from '../label';

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