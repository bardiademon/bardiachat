const {connect} = require ("./ConnectDatabase");
const {time} = require ("../Classes/Time");

/**
 * @bardiademon
 * @param code
 * @param afterCheck
 */
const isLoginCode = (code , afterCheck) =>
{
    let linkConnection = connect ();
    if (linkConnection !== null)
    {
        linkConnection.query (makeQuery ("code") , [code , true , time ()] , (error , results) =>
        {
            afterCheck ((!error && results.length > 0) , ((results.length > 0) ? (results[0]).id_acc : 0));
        });
    }
    else afterCheck (false , 0);
};
/**
 * @bardiademon
 * @param id
 * @param afterCheck
 */
const isLoginId = (id , afterCheck) =>
{
    let linkConnection = connect ();
    if (linkConnection !== null)
    {
        linkConnection.query (makeQuery ("id_acc") , [id , true , time ()] , (error , results) =>
        {
            afterCheck ((!error && results.length > 0) , ((results.length > 0) ? (results[0]).id_acc : 0));
        });
    }
    else afterCheck (false , 0);
};

/**
 * @bardiademon
 * @param rowName
 * @returns {string}
 */
const makeQuery = (rowName) => ("SELECT `id_acc` FROM `login` WHERE `" + rowName + "`=? && `credibility`=? && `time_logout`>?");

/**
 * @bardiademon
 * @type {{isLoginId: isLoginId, isLoginCode: isLoginCode}}
 */
module.exports = {isLoginCode , isLoginId};