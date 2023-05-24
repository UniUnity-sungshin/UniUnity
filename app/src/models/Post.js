const PostStorage=require("./PostStorage");

class Post{
    constructor(body){
        this.body=body;
    }
    //최신순 포스트 리스트 불러오기
    async showPostListAll(university_url){
        try{
            let university_id= await PostStorage.getUniversityUrlToID(university_url);
            const response=await PostStorage.getPostListAll(university_id);
            return response;
        }catch(err){
            return{success:false,msg:err};
        }
    }
    

}

module.exports=Post