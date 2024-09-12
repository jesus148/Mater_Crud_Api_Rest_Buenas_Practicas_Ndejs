import { Router } from "express";
import validateJwt from "../middlewares/validateJWT";
import { createProduct, deleteProduct, getProducts, getProductsByPrice, updateProduct } from "../controllers/product.controller";
import { validateField } from "../middlewares/validateField";
import { check } from "express-validator";
import label from "../label";
import { productExist } from "../helpers/db.validators";


const router =Router();

// ROUTES para todo productos


// metodo obtener todo
// "/"  : para los get all recomendable poner esto 
router.get( "/" , [
    // validando el token enviado desde el front 
    // si todo ok pasa al getProducts
    validateJwt
], getProducts )  




// metodo lista por precios
router.get("/byprice",[
    validateJwt //valida token
    //metodo controller 
] ,getProductsByPrice )




// metodo crear productos
router.post( "/create" ,[
    validateJwt, //valida token
    validateField //valida campos request front
    // todo ok pasa al metodo pa crear
], createProduct)




// metodo para actualizar
// :id = es el parametro
router.put("/update:id",[
     validateJwt, //validat token 
    //  valiacion con check usando el :id parametro 
    //  verifica si el id de producto corresponde a un id de la collecion de mongodb
     check('id' , label.NOT_VALID_ID).isMongoId, //el id es correspondiente a mongodb, si no es lanzara el mensaje
     check('id').custom(productExist) ,//llama al metodo productExist , verifica si el producto existe en la bd
     validateField //validando los request del front
    ] , updateProduct) //llama al metodo final





    
    // metodo elimina
    // check: su función es validar ciertos campos en la solicitud HTTP antes de que se ejecuten los controladores (en este caso, deleteProduct).
router.delete( '/delete:id',[
    // verifica todo esto validaciones despued ejecuta el deletproduct
    validateJwt, //validat token 
    //  valiacion con check usando el :id parametro 
    //  verifica si el id de producto corresponde a un id de la collecion de mongodb
     check('id' , label.NOT_VALID_ID).isMongoId, //el id es correspondiente a mongodb, si no es lanzara el mensaje
     check('id').custom(productExist) ,//llama al metodo productExist , verifica si el producto existe en la bd
     validateField //validando los request del front
], deleteProduct) //eliminado producto



// exportando 
export default router;