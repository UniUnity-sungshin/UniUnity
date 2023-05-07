const UniversityStorage=require("./UniversityStorage");

class University{
    constructor(body){
        this.body=body;
    }
    async searchUniversity(keyword){
        try{
            const response=await UniversityStorage.searchUniversityName(keyword);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
}

module.exports=University