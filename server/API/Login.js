const {login} = require ("../Model/Login");
const {isLoginId} = require ("../Model/IsLogin");
const {logout} = require ("../Model/Logout");

const KR_USERNAME = "username";
const KR_PASSWORD = "password";

/**
 * @var string
 */
let username , password;

/**
 * @bardiademon
 * @param request
 * @returns {boolean}
 */
const checkRequest = (request) =>
{
    // let parse = JSON.parse (request);
    return (((username = request[KR_USERNAME]) !== undefined) && ((password = request[KR_PASSWORD]) !== undefined));
};


let response;

/**
 * @bardiademon
 * @param req
 * @param res
 * @param request
 * @param result
 */
const api = (req , res , request , result) =>
{
    response = res;
    if (checkRequest (request))
    {
        const {checkInfoLogin} = require ("../Model/CheckInfoLogin");
        checkInfoLogin (username , password , (found , id , username) =>
        {
            if (found)
            {
                isLoginId (id , (isLogin , idLogin) =>
                {
                    if (isLogin)
                    {
                        logout (idLogin , (logout) =>
                        {
                            if (logout) setLogin (id , username , result);
                            else result (false , 500 , {"login": false});
                        });
                    }
                    else setLogin (id , username , result);
                });
            }
            else result (false , 200 , "اطلاعات وارد شده نادرست است");
        });
    }
    else result (false , 400 , "Bad Request");
};

/**
 * @bardiademon
 * @param id
 * @param username
 * @param result
 */
const setLogin = (id , username , result) =>
{
    login (id , username , (ok , code) =>
    {
        if (ok)
        {
            response.cookie ("code" , code);
            result (true , 200 , {"login": true});
        }
        else result (true , 500 , {"login": false});
    });
};

/**
 * @bardiademon
 * @type {{api: api}}
 */
module.exports = {api};