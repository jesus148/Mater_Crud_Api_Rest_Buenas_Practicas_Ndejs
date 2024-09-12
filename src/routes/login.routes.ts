
import { Router } from "express";
import login from '../controllers/login.controller';
import { check } from "express-validator";
import label from "../label";
import { validateField } from "../middlewares/validateField";

// ROUTER  : mapea los endpoint

const router = Router()


// enpoint para logearte



// 1 forma de hacerlo
// check : modulo para validaciones
// router.post('/login', 
//  //atributos clase         mensaje         no puede estar vacio
// check('username' , label.EMPTY_FIELD).not().isEmpty(),
// check('password' , label.EMPTY_FIELD).not().isEmpty(),
//check('role' , label.EMPTY_FIELD).not().isEmpty(),
// check('status' , label.EMPTY_FIELD).not().isEmpty()
//,login);




// 2 forma de hacerlo
// validateField : es un validator pa verificar los request de las peticiones
// http://localhost:3000/api/login  ---post
// {
//   "username": "administrador",
//   "password": "1232344"
// }
router.post('/', [
  validateField
] ,login);



// exportando el router        
export default router;        
