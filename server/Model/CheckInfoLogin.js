const {shaToSha} = require ("../Classes/Sha");

/**
 * @bardiademon
 * @param username
 * @param password
 * @param afterGet
 */
const checkInfoLogin = (username , password , afterGet) =>
{
    const {connect} = require ("../Model/ConnectDatabase");

    let linkDatabase = connect ();

    if (linkDatabase !== false)
    {
        // shaToSha (password , username)
        linkDatabase.query (makeQuery () , [username , password] , (error , results) =>
        {
            if (error) afterGet (false , 0);
            else
            {
                if (results.length > 0)
                {
                    let result = results[0];
                    afterGet (true , result.id , result.username);
                }
                else afterGet (false , 0);
            }
        });
    }
    else afterGet (false , 0);
};

/**
 * @bardiademon
 * @returns {string}
 */
const makeQuery = () => ("select `id`,`username` from `account` where `username`=? and `password`=?");

/**
 * @bardiademon
 * @type {{checkInfoLogin: checkInfoLogin}}
 */
module.exports = {checkInfoLogin};