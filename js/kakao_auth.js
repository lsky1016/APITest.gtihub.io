Kakao.init('41e41c91268869e9fc9edb0b1797544a')
console.log("Kakao",Kakao)
console.log("isInitialized",Kakao.isInitialized())

console.log("getAccessToken",Kakao.Auth.getAccessToken());

//로그인창 활성화 + 인증 이후 accessToken발급&등록
const kakaoLogin = ()=>{
    if(Kakao.Auth.getAccessToken())
    {
        location.href="/수업2/main.html";
        return ;
    }

    Kakao.Auth.loginForm({
        scope:'profile_image,gender,account_email',

        success : function(response){
            console.log("kakaoLogin_Success",response);
            location.href='/수업2/main.html';
        },
        fail : function(error){
            console.log("kakaoLogin_error",error);
        }
    })

}

//내정보 확인
const myInfo = ()=>{
    if(!Kakao.Auth.getAccessToken())
    {
        location.href='/수업2/login.html';
        return ;
    }

    console.log("myInfo-accessToken",Kakao.Auth.getAccessToken());
    Kakao.API.request({
        url : '/v2/user/me',
        success : function(response){
            console.log("myinfo_resp",response);
        },
        fail : function(error){
            console.log("myinfo_err",error);
        }
    })
}
//로그아웃
const kakaoLogout = ()=>{

    console.log("kakaoLogout-accessToken",Kakao.Auth.getAccessToken());
    Kakao.Auth.logout(function(){
        console.log("kakaoLogout-accessToken",Kakao.Auth.getAccessToken());

    })

    Kakao.Auth.setAccessToken(null);        ////엑세스토큰 제거

    location.href='/수업2/login.html';
}
//연결끊기
const kakaoUnlink = ()=>{

    Kakao.API.request({
        url: '/v1/user/unlink',
        success : function(response){
            console.log("kakaoUnlink",response);
            Kakao.Auth.setAccessToken(null);    //엑세스토큰 제거
            location.href='/수업2/login.html';
        },
        fail : function(error){
            console.log("kakaoUnlink",error);
        }
    })
}






