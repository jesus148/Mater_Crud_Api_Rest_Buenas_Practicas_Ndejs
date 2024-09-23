

import Product from '../models/product.model';
// validar si el producto existe

export const productExist = async ( id: string) =>{
    try{
        // busca el producto
        const idDb = await Product.findById(id);

        // producto vacio
        if(!idDb){
            // genera un error
            throw new Error("el producto con id : " + id + "no existe")
        }
    }catch(error){
        // mensaje dev
        console.log(error)

        // genera un error
        throw new Error("el servidor fallo ")

    }
}