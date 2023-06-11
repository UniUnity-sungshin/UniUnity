"use strict";

const PartnerStorage = require("./PartnerStorage");

class Partner{
    async getUniversityID(university_url){
        try{
            const response = await PartnerStorage.getUniversityID(university_url);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
    async getUniversityName(university_url){
        try{
            const response = await PartnerStorage.getUniversityName(university_url);
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
            const response = await PartnerStorage.getUniversity(university_url);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
    async getUniversityID_name(university_name){
        try{
            const response = await PartnerStorage.getUniversityID_name(university_name);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
    async uploadPartnerStore(storeName, store_location, latitude, longitude, university_id, content, startDate, endDate){
        try{
            const response = await PartnerStorage.uploadPartnerStore(storeName, store_location, latitude, longitude, university_id, content, startDate, endDate);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
    async DeletePartnerStore(storeID){
        try{
            const response = await PartnerStorage.DeletePartnerStore(storeID);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
};

module.exports = Partner;