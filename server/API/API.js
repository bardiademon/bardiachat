const {existsSync} = require ('fs');

/**
 * @bardiademon
 * @param req
 * @param res
 */
const api = (req , res) =>
{
    if (req.method === "POST")
    {
        let nameApi = req.body.name_api;
        const nameFile = "./" + nameApi + ".js";

        const {api} = require (nameFile);
        api (req , res , req.body.request , (ok , scode , result) =>
        {
            res.contentType ("text/json");
            res.status (scode);
            let finalResult = JSON.stringify ({"scode": scode , "ok": ok , "result": result});
            res.write (finalResult);
            res.end ();
        });
    }
    else res.end ();
};

/**
 * @bardiademon
 * @type {{api: api}}
 */
module.exports = {api};