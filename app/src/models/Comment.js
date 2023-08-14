const CommentStorage = require("./CommentStorage");
const PostStorage = require("./PostStorage");

class Comment {
    constructor(body) {
        this.body = body;
    }
    //댓글 작성하기
    async createComment() {
        const client = this.body;
        try {
            const response1 = await CommentStorage.saveComment(client);
            const response2 = await CommentStorage.updatePostCommentCount(client.post_id);
            if(response1.result==true && response2.result==true){
                return response1;
            }
        } catch (err) {
            return { result:false, err }
        }
    }
    //comment_id로 댓글 불러오기
    async showComment(comment_id) {
        try {
            const response = await CommentStorage.getComment(comment_id);
            return response;
        } catch (err) {
            return { err }
        }
    }
    //post_id별로 댓글들 불러오기
    async showCommentListbyPostID(post_id) {
        try {
            const response = await CommentStorage.getCommentListbyPostID(post_id);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }

    //최신순 댓글리스트 불러오기
    async showCommentListAll(comment_id) {//post_id
        try {
            // let post_id=await PostStorage.getPost(post_id);
            const response = await CommentStorage.getCommentListAll(post_id, comment_id);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }

    //댓글 삭제하기
    async doDeleteComment(user_email,comment_id) {
        try {
            const response = await CommentStorage.goDeleteComment(user_email,comment_id);
            return response;
        } catch (err) {
            return { err };
        }
    }
    //댓글 개수 반환
    async postCommentpNum(post_id) {
        try {
            const response = await CommentStorage.postCommentNum(post_id);
            return response;
        } catch (err) {
            return {
                result: false,
                status: 500,
                msg: err
            };
        }
    }
}





module.exports = Comment