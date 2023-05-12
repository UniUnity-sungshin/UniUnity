const CouncilStorage=require("./CouncilStorage");

class Council{
    constructor(body){
        this.body=body;
    }
    async showUniversity(universityName){
        try{
            const response=await CouncilStorage.getUniversity(universityName);
            console.log("Council.js에서 showUniversity 성공");
            return response;
        }catch(err){
            console.log("showUniversity 에러");
            return{success:false,msg:err};
        }
    }
}

module.exports=Council;