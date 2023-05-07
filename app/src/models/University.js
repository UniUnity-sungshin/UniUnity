const UniversityStorage=require("./UniversityStorage");

class University{
    constructor(body){
        this.body=body;
    }
    async showUniversityNameList(){
        try{
            const response=await UniversityStorage.getUniversityNameList();
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
}

module.exports=University