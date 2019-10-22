const {isLoginCode} = require ("../Model/IsLogin");

let idUser;

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
            isLoginCode (code , (isLogin , id) =>
            {
                idUser = id;
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

const getIdUser = () => idUser;

/**
 * @bardiademon
 * @type {{isLogin: api, getIdUser: (function(): *), api: api}}
 */
module.exports = {api , isLogin: api, getIdUser};