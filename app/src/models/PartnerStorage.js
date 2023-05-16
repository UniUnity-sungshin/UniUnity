"use strict";

const { resolve } = require("path");
const { reject } = require("underscore");
const { pool } = require("../../config/db");

class PartnerStorage{
    // unversity_name 입력받아 university_id 보내기
    static getUniversityID(university_name){
        return new Promise(async(resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    console.error('MySQL 연결 오류: ',err);
                    throw err;
                }
            });
            pool.query("SELECT university_id FROM University WHERE university_name=?;",[university_name],function(err,rows){
                if(err){
                    console.err('Query 오류',err);
                    throw err;
                }
                // console.log(rows[0].university_id);
                resolve(rows[0].university_id);
            })           
        })
    }
    // university_id로 해당 대학의 제휴 가게 모두 뽑아내기
    static async getPartnerStores(university_id){ 
        return new Promise(async(resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    console.error('MySQL 연결 오류: ',err);
                    throw err;
                }
            });
            pool.query("SELECT * FROM Partner WHERE university_id=?;",[university_id],function(err,rows){
                if(err){
                    console.err('Query 오류',err);
                    throw err;
                }
                // console.log(rows);
                resolve(rows);
            })
        })    
    }
    // university_name에 해당하는 배열의 개수 반환 -> partnerPage.js에서 size로 사용
    static async getPartnerStoreSize(university_id){ 
        return new Promise(async(resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    console.error('MySQL 연결 오류: ',err);
                    throw err;
                }
            });
            pool.query("SELECT count(*) FROM Partner WHERE university_id=?;",[university_id],function(err,rows){
                if(err){
                    console.err('Query 오류',err);
                    throw err;
                }
                // console.log(rows);
                resolve(rows);
            })
        })    
    }
    // University 중심좌표 받아오기
    static async getUniversityLocation(university_id){ 
        return new Promise(async(resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    console.error('MySQL 연결 오류: ',err);
                    throw err;
                }
            });
            pool.query("SELECT latitude, longitude FROM University WHERE university_id=?;",[university_id],function(err,rows){
                if(err){
                    console.err('Query 오류',err);
                    throw err;
                }
                resolve(rows);
            })
        })    
    }
};

module.exports = PartnerStorage;