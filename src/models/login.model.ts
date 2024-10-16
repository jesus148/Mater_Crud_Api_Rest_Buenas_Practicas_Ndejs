
import {getModelForClass , prop} from '@typegoose/typegoose'




// clase Login : esto es para crear una instancia , login.model.ts(name clase poner en minuscula)
class Login{

    // private : encapsulamiento , si pones esto no podra usarlo en el exterior
    // prop : sirve para referenciar una clase con una coleccion en la bd  , es un decorador en el .ts tambien funciona para decidir sus especificaciones de esa colleccion(collecion es = a 1 tabla)
    // "experimentalDecorators": true:   ----- tsconfig.json - linea 17 - descomentar pa usar el prop 
    // trim:true  : ignora los espacio
    // type:()=>String  : tipo de dato string


    // aca un campo _uid que no se pone explicitamente pero que es el id de esta clase en la coleccion de mongodb

    @prop({required:true  , trim:true , unique:true , type:()=>String})
    public username: string 

    // @prop({required:true  , trim:true , type:()=>String , minlength :7 , maxlength : 8})
    @prop({required:true  , trim:true , type:()=>String}) //ponemos sin min pq al encriptar es mas de 8 caracteres
    public password: string 

    //permisos tendra el usuario , admin .etc 
    // se sacara de un combo
    @prop({required:true , type:()=>String })
    public role: string

    //si accede el usuario esta activo o inactivo
    // status : no tendran unique para q no haiga muchos usuarios
    // default: true : por defecto es true si no recibe nigun valor sera true
    @prop({required:true , type:()=>Boolean , default: true })
    public status: boolean

    // inicia para crear la instancia y el objeto
    constructor(
        username: string ,
        password : string,
        role : string , 
        status : boolean 
    ){
        // aqui              parametros
        this.username = username
        this.password = password
        this.role = role
        this.status = status
    }



    // GET metodos
    // metodos para tener acceso a los atributos
    //_: siempre al inicio comenzar con esto el guion abajo
    get _username(): string {
        return this.username
    }
    get _password(): string {
        return this.password
    }
    get _role(): string {
        return this.role
    }
    get _status(): boolean {
        return this.status
    }




    // SET metodos
    set _password( password : string){
        this.password = password;
    }




}


// getModelForClass : importar del typegoose
// osea esto para usar conjuntamente con mongoose osea interactua con la bd
const LoginModel = getModelForClass(Login);

export default LoginModel //exportando el modelo