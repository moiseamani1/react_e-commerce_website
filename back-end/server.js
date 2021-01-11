import express from 'express'
import dotenv from 'dotenv';
import properties from './properties';
import mongoose from 'mongoose';
import userRoutes from './Routes/userRoutes'
import productRoutes from'./Routes/productRoutes'
import mailingRoutes from'./Routes/mailingRoutes'
import faqRoutes from'./Routes/faqRoutes'
import orderRoutes from'./Routes/orderRoutes'
import bodyParser from 'body-parser';


import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/analytics';


dotenv.config();
const mongodbUrl=properties.MONGODB_URL;

mongoose.connect(mongodbUrl,{
    useUnifiedTopology: true ,
    useNewUrlParser:true,
    useCreateIndex:true
}).catch(err=>console.log(err.reason))

const app=express();



app.use(bodyParser.json());


app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/faqs",faqRoutes);

app.use("/api/mailing",mailingRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/property/:id', (req, res) => {
    //console.log(process.env.PAYPAL_CLIENT_ID)
    const id=req.params.id;
    if(id==="paypal"){
      res.send(properties.PAYPAL_CLIENT_ID || 'sb');
    }
  });


  export var firebaseConfig = {
    apiKey: properties.API_KEY,
    authDomain:  properties.AUTH_DOMAIN,
    databaseURL: properties.DATABASE_URL,
    projectId: properties.PROJECT_ID,
    storageBucket: properties.STORAGE_BUCKET,
    messagingSenderId: properties.MESSAGING_SENDER_ID,
    appId: properties.APP_ID,
    measurementId: properties.MEASUREMENT_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  export const googleProvider = new firebase.auth.GoogleAuthProvider();

  export const fbProvider = new firebase.auth.FacebookAuthProvider();

  auth.onAuthStateChanged(async (userAuth) => {

    if(!userAuth){
      const { data } = app.post('/api/users/logout', );
      
     
    }
    
    })

























app.listen(5000,()=>console.log("Server is running at port 5000"));