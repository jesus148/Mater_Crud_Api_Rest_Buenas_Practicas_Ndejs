

import Product from '../models/product.model';

// // validar si el producto existe , esto valida solo id que sean de mongodb su estructura

export const productExist = async ( id: string) =>{
    try{
        // busca el producto , 
        const idDb = await Product.findById(id);

        // producto vacio   
        if(!idDb){
            // genera un error por lo tanto ejecuta el catch , este error se imprime en clg del catch
            throw new Error("el producto con id : " + id + "no existe")
        }
    }catch(error){
        // mensaje dev
        console.log(error)

        // genera un error para el front
        throw new Error("el servidor fallo ")

    }
}