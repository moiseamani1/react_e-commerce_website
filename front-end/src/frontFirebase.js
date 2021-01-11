
import firebase from 'firebase';
import properties from './properties';

var firebaseConfig = {
    apiKey: properties.API_KEY,
    authDomain:  properties.AUTH_DOMAIN,
    databaseURL: properties.DATABASE_URL,
    projectId: properties.PROJECT_ID,
    storageBucket: properties.STORAGE_BUCKET,
    messagingSenderId: properties.MESSAGING_SENDER_ID,
    appId: properties.APP_ID,
    measurementId: properties.MEASUREMENT_ID
  }

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }


 const googleprovider = new firebase.auth.GoogleAuthProvider();
googleprovider.setCustomParameters({
    prompt: 'select_account'
  });


const fbprovider = new firebase.auth.FacebookAuthProvider();

fbprovider.setCustomParameters({
    'display': 'popup'
  });

const auth = firebase.auth();
   
export  {googleprovider,fbprovider,auth}
