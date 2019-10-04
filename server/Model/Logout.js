const {connect} = require ("./ConnectDatabase");

/**
 * @bardiademon
 * @param id
 * @param afterLogout
 */
let logout = (id , afterLogout) =>
{
    let linkConnection = connect ();

    if (linkConnection !== false)
    {
        linkConnection.query (makeQuery () , [false , id] , (err , result) =>
        {
            afterLogout ((!err && result.affectedRows > 0));
        })
    }
    else afterLogout (false);
};

/**
 * @bardiademon
 * @returns {string}
 */
let makeQuery = () => ("update `login` set `credibility`=? where `id`=?");

/**
 * @bardiademon
 * @type {{logout: logout}}
 */
module.exports = {logout};