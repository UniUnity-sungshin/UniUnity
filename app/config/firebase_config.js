//firebase.config
require('dotenv').config();

module.exports={
    firebaseConfig:{
        apiKey: process.env.FIREBASE_CONFIG_APIKEY,
        authDomain: process.env.FIREBASE_CONFIG_AUTHDOMAIN,
        projectId: process.env.FIREBASE_CONFIG_PROJECTID,
        storageBucket: process.env.FIREBASE_CONFIG_STORAGEBUCKET,
        messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGEINGSENDERID,
        appId: process.env.FIREBASE_CONFIG_APPID
    },
     credentials: {
      clientEmail: process.env.FIREBASE_CREDENTIALS_CLIIENTEMAIL,
      privateKey: process.env.FIREBASE_CREDENTIALS_PRIVATEKEY
     
    }
}
