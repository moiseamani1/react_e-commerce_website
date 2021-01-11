import mongoose from 'mongoose';



const addressSchema=new mongoose.Schema({
    fullname:{type:String,required:true},
    street:{type:String,required:true},
   city:{type:String,required:true},
   postalCode:{type:String},
   country:{type:String,required:true},
   
})


const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true,dropDups:true},
    password:{type:String,required:true},
    isContentManager:{type: Boolean,required:true,default:false},
    addresses:[addressSchema]}
    )
const User=mongoose.model("User",userSchema)

export default User;