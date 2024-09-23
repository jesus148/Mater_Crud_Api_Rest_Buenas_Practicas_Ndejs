
// product.model.ts : poner minuscula en name de este file

import { getModelForClass, prop } from "@typegoose/typegoose";

// Product : clase con mayuscula al inicio 
// este es para crear la instancia , 
// al crear la tabla lo creara en plural products
class Product{

    // trim:true  : quita los espaciados
    // type:() => String : tipos de datos 
    // required:true  : requerido   
    // min:1 : para numeros > 1


    @prop({required:true , trim:true  , type:() => String})
    public  name: string

    @prop({required : true , trim:true , type: () => String })
    public description : string

    @prop({required : true , type: () => Number , min:1 })
    public  price : number

        @prop({required : true , type: () => Number , min:1 })
        public quantity : number


    // estado del producto si esta vacio o hay stock
    @prop({required : true , type: () => String })
    public status : string





    // instancia creados objeto o clase
    constructor(
        name : string , 
        description : string , 
        price : number , 
        quantity : number , 
        status : string
    ){
        this.name = name
        this.description = description
        this.price = price
        this.quantity = quantity
        this.status = status
    }


}       




// creacion modelo a partir de una clase , acceso a la bd 
// con esto tienes acceso a las bd sus metodos
const ProductModel = getModelForClass(Product)

// exportando
export default ProductModel;