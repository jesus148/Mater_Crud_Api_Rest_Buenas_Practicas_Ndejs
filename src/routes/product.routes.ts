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
// postman 
// http://localhost:3000/api/products/ -----get
// // postman poner : headers >  
// //    AUTHORIZATION(key) > (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....)token obtenido del login 
router.get( "/" , [
    // validando el token enviado desde el front 
    // si todo ok pasa al getProducts
    validateJwt('SUPER') //solo los usarios con TEC rol podran usar este metodo y los admin
], getProducts )  









// metodo lista por precios
// postman ---
// http://localhost:3000/api/products/byprice   ----get 
// {
// "min": 3 ,
// "max": 10
// }   
// // postman poner : headers >  
// //    AUTHORIZATION(key) > (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....)token obtenido del login 
router.get("/byprice",[
    validateJwt() //valida token
    //metodo controller 
] ,getProductsByPrice )











// metodo crear productos
// http://localhost:3000/api/products/create   -----post(postman)
// { 
//     "name":"mouse",
//     "description":"inalambrico",
//     "price":14.50,
//     "quantity":"5",  
//     "status":"nuevo"
// } 
// // postman poner : headers >  
// //    AUTHORIZATION(key) > (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....)token obtenido del login 
router.post( "/create" ,[
    validateJwt(), //valida token
    validateField //valida campos request front
    // todo ok pasa al metodo pa crear
], createProduct)












// metodo para actualizar
// http://localhost:3000/api/products/update/66e8f49b576cdfce0b3334a9(id colllecion) ----put
// { 
//     "name":"fideos",
//     "description":"abarrotes",
//     "price":7.50,
//     "quantity":"5", 
//     "status":"usado"
// } 
// // postman poner : headers >  
// //    AUTHORIZATION(key) > (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....)token obtenido del login 
// :id = es el parametro
router.put("/update/:id",[

     validateJwt(), //validat token 
    //  valiacion con check usando el :id parametro 
    //  verifica si el id de producto corresponde a un id de la collecion de mongodb
     check('id' , label.NOT_VALID_ID).isMongoId(), //el id es correspondiente a mongodb, si no es lanzara el mensaje
     check('id').custom(productExist) ,//llama al metodo productExist , verifica si el producto existe en la bd
     validateField //validando los request del front
    ] , updateProduct) //llama al metodo final







    

    
    // metodo elimina
    // http://localhost:3000/api/products/delete/66e8f49b576cdfce0b3334a9(id de la coleccion)  -----delete
    // postman poner : headers >  
    // AUTHORIZATION(key) > (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....)token obtenido del login 
    // check: su función es validar ciertos campos en la solicitud HTTP antes de que se ejecuten los controladores (en este caso, deleteProduct).
router.delete( '/delete/:id',[
    // verifica todo esto validaciones despued ejecuta el deletproduct
    validateJwt, //validat token 
    //  valiacion con check usando el :id parametro 
    //  verifica si el id de producto corresponde a un id de la collecion de mongodb
     check('id' , label.NOT_VALID_ID).isMongoId(), //el id es correspondiente a mongodb, si no es lanzara el mensaje
     check('id').custom(productExist) ,//llama al metodo productExist , verifica si el producto existe en la bd
     validateField //validando los request del front
], deleteProduct) //eliminado producto


// ojo: recordar que el delete no se usa mucho pq es peligroso , en su remplazo se usa la eliminacion logica q es el put 
//       solo se cambia ciertos campos como el estado .etc









// exportando 
export default router;