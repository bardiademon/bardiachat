const {shaToSha} = require ("../Classes/Sha");

/**
 * @bardiademon
 * @param phone
 * @param password
 * @param afterGet
 */
const checkInfoLogin = (phone , password , afterGet) =>
{
    const {connect} = require ("../Model/ConnectDatabase");

    let linkDatabase = connect ();

    if (linkDatabase !== false)
    {
        // shaToSha (phone , username)
        linkDatabase.query (makeQuery () , [phone , shaToSha (phone , password)] , (error , results) =>
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
const makeQuery = () => ("select `id`,`phone` from `account` where `phone`=? and `password`=?");

/**
 * @bardiademon
 * @type {{checkInfoLogin: checkInfoLogin}}
 */
module.exports = {checkInfoLogin};