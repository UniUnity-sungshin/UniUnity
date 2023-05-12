"use strict"
const { pool } = require("../../config/db");

class CouncilStorage{
    static getUniversity(universityName) {

        return new Promise(async (resolve,reject)=>{
            console.log("getUniversity 함수입니다.");
            const query = "SELECT university_name FROM University WHERE university_url =?;";
            console.log("쿼리 실행 전입니다.");
            pool.query(query,[universityName],(err,data)=>{
                if(err)reject(`${err}`);
                
                else {
                    console.log("getUniversity 에러");
                    console.log(data[0]);
                    resolve(data[0]);
                }
            });
            // pool.query(`SELECT university_name FROM University WHERE university_url =?`, function (error, results) {
            //     if (error) throw error;
            //     console.log(results);
            //   });
        });
    }
}

module.exports=CouncilStorage;