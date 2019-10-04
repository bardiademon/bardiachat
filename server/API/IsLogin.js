const {isLoginCode} = require ("../Model/IsLogin");

/**
 * @bardiademon
 * @param req
 * @param res
 * @param request
 * @param result
 */
const api = (req , res , request , result) =>
{
    try
    {
        let code = req.cookies.code;
        if (code !== undefined)
        {
            isLoginCode (code , (isLogin) =>
            {
                result (true , 200 , {"is_login": isLogin});
            });
        }
        else result (true , 200 , {"is_login": false});
    }
    catch (e)
    {
        result (true , 200 , {"is_login": false});
    }
};

/**
 * @bardiademon
 * @type {{api: api}}
 */
module.exports = {api};