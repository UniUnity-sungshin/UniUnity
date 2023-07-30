const CouncilStorage=require("./CouncilStorage");

class Council{
    constructor(body){
        this.body=body;
    }

    async getUniversityName(university_url){
        try{
            const response = await CouncilStorage.getUniversityName(university_url);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
    
    async getUniversityID(university_url){
        try{
            const response = await CouncilStorage.getUniversityID(university_url);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }

    async getCardNewsImageUrl(university_id){
        try{
            const response = await CouncilStorage.getCardNewsImageUrl(university_id);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
}

module.exports=Council;
