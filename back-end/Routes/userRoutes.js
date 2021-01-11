import express from 'express';
import User from '../Models/user';
import {getToken,isAuth} from '../util'
 import {auth, fbProvider, firebaseConfig, firestore,googleProvider} from "../server";
 import firebase from 'firebase/app';
import 'firebase/firestore';

 







const router=express.Router();



export const signInWithGoogle = () => {
auth.signInWithPopup(provider);
};


// const userRef = firestore.doc(`users/${user.uid}`);
// const snapshot = await userRef.get();



export const generateUserDocument = async (user, additionalData) => {
if (!user) return;
const userRef = firestore.doc(`users/${user.uid}`);
const snapshot = await userRef.get();
if (!snapshot.exists) {
  // const { email, displayName, photoURL } = user;
  try {
    await userRef.set({
      // displayName,
      // email,
      // photoURL,
      ...additionalData
    });
  } catch (error) {
    console.error("Error creating user document", error);
  }
}
return getUserDocument(user.uid);
};
export const getUserDocument = async (uid) => {
if (!uid) return null;
try {
  const userDocument = await firestore.doc(`users/${uid}`).get();

  return userDocument.data()||null;

} catch (error) {
  console.error("Error fetching user", error);
}
};

export const updateDocument = async (uid,data) => {
if (!uid) return null;
try {
  const userRef = firestore.doc(`users/${uid}`);
  await userRef.update(data)
  const userDocument= await getUserDocument(uid);
  return {userDocument};
} catch (error) {
  console.error("Error updating document: ", error);
}
};

export const updateShipping = async (uid,isAdd,data) => {
  if (!uid) return null;
  try {
    const userRef = firestore.doc(`users/${uid}`);
    if(isAdd){
      await userRef.update({shippingAddress:firebase.firestore.FieldValue.arrayUnion(data)})
    }else{
  await userRef.update({shippingAddress:firebase.firestore.FieldValue.arrayRemove(data)})
}
    
    
    const userDocument= await getUserDocument(uid);
    return {userDocument};
  } catch (error) {
    console.error("Error updating document: ", error);
  }
  };







const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
event.preventDefault();
try{
  const {user} = await auth.createUserWithEmailAndPassword(email, password);
  generateUserDocument(user, {displayName});
}
catch(error){
  setError('Error Signing up with email and password');
}

setEmail("");
setPassword("");
setDisplayName("");
};

const signInWithEmailAndPasswordHandler = (event, email, password) => {
event.preventDefault();
auth.signInWithEmailAndPassword(email, password).catch(error => {
  setError("Error signing in with password and email!");
  console.error("Error signing in with password and email", error);
});
};


















function checkProperties(obj) {
  for (var key in obj) {
      if (obj[key] !== null && obj[key] != "")
          return false;
  }
  return true;
}












router.post('/logout',async(req,res)=>{
  await auth.signOut().then(()=>{

    res.status(200).send({message:'Logged out'})
  }).catch((err)=>{
    res.status(401).send({message:err.message});
  });
  

})

router.post('/login',async(req,res)=>{

  console.log('The providers '+req.body.provider)
  if(req.body.provider=='email'){
  const email=req.body.email
  const password=req.body.password
  await auth.signInWithEmailAndPassword(email, password)
  .then(async(result)=>{
    console.log(' login in user id:'+result.user.uid)
    console.log(' login in displayName:'+result.user.displayName)
    console.log(' login in user email:'+result.user.email)
    const data=await getUserDocument(result.user.uid)

   // console.log('this is the data is Content manager'+data.isContentManager)
    const loginUser={_id:result.user.uid,name:result.user.displayName,email:result.user.email,isContentManager:data.isContentManager}
    res.send({_id:result.user.uid,
                  name:result.user.displayName,
                  email:result.user.email,
                  isContentManager:data.isContentManager,
                  token:getToken(loginUser)})
    })
  .catch(function(err) {
    // Handle errors
    res.status(401).send({message:err.message});
  });
}else if(req.body.provider=='google' || req.body.provider=='fb' ){

  

  const token=req.body.token.toString()
   var credential =req.body.provider=='google'? googleProvider.credential(null,token):fbProvider.credential(null,token);
  
  await auth.signInWithCredential(credential)
  .then(async (result)=>{
    if(result){
      console.log('displayName '+result.user.displayName)
      console.log('email '+result.user.email)
      console.log('authorized user id: ' +result.user.uid)
      const data=await getUserDocument(result.user.uid)
      if(!data){await generateUserDocument(result.user,{isContentManager:false})}
      const isContentManager=data?data.isContentManager:false;
      const loginUser={_id:result.user.uid, 
        name:result.user.displayName||'',
        email:result.user.email,isContentManager:isContentManager}
      res.send({_id:result.user.uid,
                    name:result.user.displayName||'',
                    email:result.user.email,
                    isContentManager:isContentManager,
                    token:getToken(loginUser)})


    }else{
      res.status(401).send({message:err.message});
    }
     
  }).catch(function(err) {
    // Handle errors
    res.status(401).send({message:err.message});
  });
    
      


  
 

}else{

  res.status(401).send({message:'Something went wrong.'});
}


    // const loginUser=await User.findOne({
    //     email:req.body.email,
    //     password:req.body.password
    // });

    // if(loginUser){
    //         res.send({_id:loginUser.id,
    //             name:loginUser.name,
    //             email:loginUser.email,
    //             isContentManager:loginUser.isContentManager,
    //             token:getToken(loginUser)
        
    //     });
    // }else{
    //     res.status(401).send({message:'Invalid email/password'});
    // }

})

router.post('/createAccount',async(req,res)=>{

  const email=req.body.email;

  console.log('This is the email '+email)
  const password=req.body.password;
await auth.createUserWithEmailAndPassword(email, password)
.then(async(result)=>{

  await result.user.updateProfile({displayName: req.body.name})
  .then(async()=>{
   // console.log(' create account user id:'+result.user.uid)
    await generateUserDocument(result.user,{isContentManager:false})
    const newUser={_id:result.user.uid,name:result.user.displayName,email:result.user.email,isContentManager:false,}
    res.send({_id:result.user.uid,
      name:result.user.displayName,
      email:result.user.email,
      isContentManager:false,
      token:getToken(newUser)})
  })

}) 
.catch(function(err) {
    // Handle errors
    res.status(401).send({message:err.message});
  });

    // const user=new User({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password:req.body.password
    // });

    // const newUser=await user.save();

    // if(newUser){
    //     res.send({_id:newUser._id,
    //         name:newUser.name,
    //         email:newUser.email,
    //          isContentManager:newUser.isContentManager,
    //         token:getToken(newUser)}
    //         )
    
    // }else{
    //     res.status(401).send({message:'Invalid user information.'});
    // }
})

// router.get("/createContentManager",async(req,res)=>{
//     try{
//     const user= new User({

//         name:'Moise Amani',
//         email:'moiseamani@hotmail.fr',
//         password:'123',
//         isContentManager:true
//     });

//     const newUser= await user.save();
//     res.send(user);
// }catch(err){
//     res.send({msg:err.message})
// }

// });


  router.get(
    '/:id',
   async (req, res) => {
      const userId = req.params.id;

      const data=await getUserDocument(userId)
      
      .catch((err)=>{
        res.status(404).send({ message: err.message });

      }).then((data)=>{
        if(auth.currentUser){
          // console.log('shipping address '+data.isContentManager)
          res.send({email:auth.currentUser.email,name:auth.currentUser.displayName,isContentManager:data.isContentManager,shippingAddress:data.shippingAddress});
        }else{
          res.status(404).send({ message: 'User not aunthenticated' });
        }
      
      })
      





      // const user = await User.findById(userId);
      // if (user) {
      //   res.send(user);
      // } else {
      //   res.status(404).send({ message: 'User Not Found.' });
      // }



    }
  );

// router.put(
//     '/:id',
//     isAuth,
//     async (req, res) => {
      
//       const user = await User.findOne({_id:req.body.id});
//       if (user) {
//         user.name = req.body.name;
//         user.email = req.body.email;
       
//         const updatedUser = await user.save();
//         if (updatedUser) {
//           return res
//             .status(200)
//             .send({ message: 'User Updated', data: updatedUser });
//         }
//       }
//       return res.status(500).send({ message: ' Error in Updating User.' });
//     }
//   );

  router.put(
    '/profile',
    isAuth,
    async (req, res) => {

      if(auth.currentUser){

        if(req.body.name){
          await auth.currentUser.updateProfile({displayName:req.body.name||auth.currentUser.displayName})
          .catch((err)=>{
            res.status(404).send({ message: err.message });
          })
        }

      if(req.body.shippingAddress){
        const isAdd=!req.body.delAddress?true:false;
        await updateShipping(auth.currentUser.uid,isAdd,req.body.shippingAddress)
      .catch((err)=>{
        res.status(404).send({ message: err.message });
      }).then((updatedDoc)=>{

        const updatedUser={_id: auth.currentUser.uid,name: auth.currentUser.displayName,email: auth.currentUser.email,isContentManager:updatedDoc.isContentManager,}
        res.send({
              _id: auth.currentUser.uid,
              name: auth.currentUser.displayName,
              email: auth.currentUser.email,
              isContentManager: updatedDoc.isContentManager,
              shippingAddress:updatedDoc.shippingAddress,
              token: getToken(updatedUser),
            });
      })

      }else{
        const updatedUser={_id:auth.currentUser.uid,name:auth.currentUser.displayName,email:auth.currentUser.email,isContentManager:req.body.isContentManager,}
        res.send({
          _id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          isContentManager: req.body.isContentManager,
          token: getToken(updatedUser),
        });
      }
      
    }else{
      res.status(404).send({ message: 'User not aunthenticated' });
    }
      
      
      // const user = await User.findById(req.user._id);


      // console.log('I found a user'+user)
      // if (user) {
      //   user.name = req.body.name || user.name;
      //   user.email = req.body.email || user.email;
      //   if (req.body.password) {
      //     // user.password = bcrypt.hashSync(req.body.password, 8);
      //   }
      //   const updatedUser = await user.save();
      //   res.send({
      //     _id: updatedUser._id,
      //     name: updatedUser.name,
      //     email: updatedUser.email,
      //     isContentManager: updatedUser.isContentManager,
      //     token: getToken(updatedUser),
      //   });
      // }





    }
  );














export default router;