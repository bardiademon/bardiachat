/**
 * @bardiademon
 */
const checkIsLogin = (afterCheck) =>
{
    $.ajax ({
        type: "POST" ,
        url: "http://localhost/api" ,
        data: {name_api: "IsLogin"} ,
        success: (answer) =>
        {
            const isLogin = (answer.result).is_login;

            if (!isLogin) gotToLogin ();

            afterCheck (isLogin);
        } ,
        error: () =>
        {
            gotToLogin ();
            afterCheck (false);
        } ,
        header: "Access-Control-Allow-Origin"
    });
};

const gotToLogin = () =>
{
    window.location.replace ("/Login");
};