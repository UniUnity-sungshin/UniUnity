"use strict"
const { pool } = require("../../config/db");

class CouncilStorage{
    static getUniversity(universityName) {
        return new Promise(async (resolve,reject)=> {
            pool.query('SELECT university_name FROM University WHERE university_url =?',[universityName],(err,data)=>{
                if(err)reject(`${err}`);
                else {               
                    console.log(data[0]);
                    resolve(data[0]);
                }
            });
        });
    }
}

module.exports=CouncilStorage;