

import {sign} from 'jsonwebtoken';
import label from '../label';



// TOKEN 
// cuando pide solicitud en vez de enviar usuario y contraseña , usaremos el jsonwebtoken , cuando un usuario se logea obtiene un token unico para ese usuario , luego en el head en cada solicitud le enviara eso el server lo verificara y luego le dara el pase. el token dura poco. 


            //    el id o uid de la collecion de la tabla en mongo se recibe como parametro
            // y el role 
const getJwt = (uid : string , role : string  )=>{

    // ok
    try{
        // promesa
        // resolve: resuelto
        // reject : rechazado
        return new Promise( (resolve , reject)=>{

            //info del usuario o payload ,no poner datos confidenciales
            // uid el uis es de momgodb de la collecion su id y el role
            const payload = { uid , role}

            //sign : es una propiedad de express pa crear token
            // process.env.SECRET_KEY  ||   ''  : pone la firma q garantiza el token or vacio si no lo encuentra
            sign(payload , process.env.SECRET_KEY  ||   '' , {
                // tiempo q expira el token  , seugun la regle de negocio y los roles del usuario
                expiresIn : '1h'
                // error al crear el token 
            },( error , token)=>{
                if(error){
                    // mensaje para el developer
                    console.log(error)

                    // mensaje para el usuario
                    reject(label.ERROR_TOKEN)

                // todo ok     
                }else{
                    // envia al usuario
                    resolve(token);
                }
            })
        })
        // error
    }catch(error){
        // mensaje desarollador
        console.log(error);

        // mensaje cliente
        throw new Error(label.ERROR)

    }
}


// exportando
export default getJwt;