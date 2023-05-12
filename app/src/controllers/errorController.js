const httpStatus =require("http-status-codes");

//에러 스택 로깅
exports.logErrors=(error,req,res,next)=>{
    console.error(err.stack);
    next(error);
};

//페이지 부재시 404상태 코드로 응답
exports.respondNoResourceFound=(req,res)=>{
    let errorCode =httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.sendFile(`./public/${errorCode}.html`,{
        root:"./src"
    })
};

//요청 처리를 중단시킨 내부 에러에 대한 로깅과 응답(라우트에 매칭되지 않은 모든 요청들을 처리)
exports.respondInternalEroor=(error,req,res,next)=>{
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occured:${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};