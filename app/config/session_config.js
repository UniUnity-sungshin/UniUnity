//session_config.js
require('dotenv').config();

module.exports={
    sessionConfig:{
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
    }
}
