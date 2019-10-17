const {login} = require ("../Model/Login");
const {isLoginId} = require ("../Model/IsLogin");
const {logout} = require ("../Model/Logout");
const phone = require ('phone');

const KR_PHONE = "phone";
const KR_PASSWORD = "password";

/**
 * @var string
 */
let valPhone , password;

/**
 * @bardiademon
 * @param request
 * @returns {boolean}
 */
const checkRequest = (request) => (((valPhone = request[KR_PHONE]) !== undefined) && ((password = request[KR_PASSWORD]) !== undefined));

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
        try
        {
            console.log (valPhone);
            const checkPhone = phone (valPhone);
            console.log (checkPhone.toString ());
            if (checkPhone[1] === "IRN")
            {
                valPhone = checkPhone[0];
                const {checkInfoLogin} = require ("../Model/CheckInfoLogin");
                checkInfoLogin (valPhone , password , (found , id) =>
                {
                    if (found)
                    {
                        isLoginId (id , (isLogin , idLogin) =>
                        {
                            if (isLogin)
                            {
                                logout (idLogin , (logout) =>
                                {
                                    if (logout) setLogin (id , valPhone , result);
                                    else result (false , 500 , {"login": false});
                                });
                            }
                            else setLogin (id , valPhone , result);
                        });
                    }
                    else result (false , 200 , "The information is incorrect");
                });
            }
            else result (false , 200 , "The information is incorrect");

        }
        catch (e)
        {
            result (false , 200 , "The information is incorrect");
        }
    }
    else result (false , 400 , "Bad Request");
};

/**
 * @bardiademon
 * @param id
 * @param valPhone
 * @param result
 */
const setLogin = (id , valPhone , result) =>
{
    login (id , valPhone , (ok , code) =>
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