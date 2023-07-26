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
            const response = await CommentStorage.saveComment(client);
            return response;
        } catch (err) {
            return { err }
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


    // async showCommentListAll(requestedPostId, comment_id) {
    //     try {
    //       // 클라이언트에서 요청한 post_id를 그대로 사용
    //       const post_id = requestedPostId;

    //       // PostStorage를 이용하여 post_id에 해당하는 데이터를 가져오는 예시 코드
    //       const post = await PostStorage.getPost(post_id);

    //       // CommentStorage를 이용하여 댓글 리스트를 가져오는 예시 코드
    //       const comments = await CommentStorage.getCommentListAll(post_id, comment_id);

    //       return { success: true, post: post, comments: comments };
    //     } catch (err) {
    //       console.error("댓글 리스트 가져오기 오류:", err);
    //       return { success: false, msg: "댓글 리스트 가져오기 실패" };
    //     }
    //   }
}

module.exports = Comment