"use strict"

const app = require("../main");
const PORT = 3000;

app.get('/test', (req,res)=>{
    console.log('request test');
    res.send("TEST");
});

app.listen(PORT, () =>{
    console.log("서버 가동test")
});
