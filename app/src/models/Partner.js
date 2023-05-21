"use strict";

const PartnerStorage = require("./PartnerStorage");

class Partner{
    async getUniversityID(university_name){
        try{
            const response = await PartnerStorage.getUniversityID(university_name);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
    async getUniversityLocation(university_id){
        try{
            const response = await PartnerStorage.getUniversityLocation(university_id);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
    async getPartnerStores(university_id){
        try{
            const response = await PartnerStorage.getPartnerStores(university_id);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
    async showUniversity(university_url){
        try{
            const response= await PartnerStorage.getUniversity(university_url);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
};

module.exports = Partner;