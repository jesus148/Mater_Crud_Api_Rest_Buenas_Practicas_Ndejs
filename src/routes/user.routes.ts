
import {Router} from 'express';
import validateJwt from '../middlewares/validateJWT';
import { validateField } from '../middlewares/validateField';
import { createUser } from '../controllers/user.controller';

// router para crear un usuario



const router = Router();


// metodo crear
// http://localhost:3000/api/users/create---póst
// {
//     "username": "administrador",
//     "password": "1232344",
//     "role": "admin"
// }
router.post('/create',[
    // validaciones , si es todo ok pasa al createUser
    // validateJwt ,  // comentar esto si agregar un admin x 1 vez
    validateField
    // metodo controller pa crear usuario
] ,createUser);




export default router;



