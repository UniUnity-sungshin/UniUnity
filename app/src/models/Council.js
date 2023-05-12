const CouncilStorage=require("./CouncilStorage");

class Council{
    constructor(body){
        this.body=body;
    }
    async showUniversity(universityName){
        try{
            const response=await CouncilStorage.getUniversity(universityName);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
}

module.exports=Council;