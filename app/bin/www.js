"use strict"

const app = require("../main");
// Constants
const PORT = process.env.PORT || 80;

app.get('/', (req,res)=>{
    console.log('request test');
    res.send("TEST");
});

app.listen(PORT, () =>{
    console.log("서버 가동test")
});
