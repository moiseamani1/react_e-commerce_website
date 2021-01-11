import mongoose from 'mongoose';


const faqSchema=new mongoose.Schema({
    title:{type:String,required:true},
    topic:{type:String,required:true},
    description:{type:String,required:true},
  
  
})
const Faq=mongoose.model("Faq",faqSchema)

export default Faq;