"use strict";

const RetailerStorage = require("./RetailerStorage");

class Retailer{
    static async storeZoneOne(){
        return new Promise(async(resolve,reject)=>{
            try{
                let obj = JSON.parse(body);
                // 콘솔에 찍어보기
                console.log(obj.body.items[0].trarNo);
                resolve()
            }catch(err){
                reject(`${err}`);
            }
        })
    }
}
module.exports = Retailer;