const {isLogin , getIdUser} = require ("./IsLogin");
const {getInfoUser} = require ("../Model/GetInfoUser");

/**
 * @bardiademon
 * @param req
 * @param res
 * @param request
 * @param result
 */
const api = (req , res , request , result) =>
{
    isLogin (req , res , request , (ok , scode , resultIsLogin) =>
    {
        try
        {
            if (resultIsLogin.is_login === true)
            {
                getInfoUser (getIdUser () , (ok , info) =>
                {
                    result (ok , (info !== null ? 200 : 400) , info);
                });
            }
            else result (false , 400 , null)
        }
        catch (e)
        {
            result (false , 400 , null)
        }
    });
};


/**
 * @bardiademon
 * @type {{api: api}}
 */
module.exports = {api , getInfo: api};