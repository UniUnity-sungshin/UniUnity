"use strict"

const app = require("../main");
// Constants
const PORT = process.env.PORT || 80;

app.listen(PORT, () =>{
    console.log("서버 가동test")
    console.log(`포트번호:${PORT}`)
});
