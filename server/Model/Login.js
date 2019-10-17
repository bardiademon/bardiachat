const {shaToSha , shaToTime} = require ("../Classes/Sha");
const {connect} = require ("./ConnectDatabase");
const {time , timePlusYear} = require ("../Classes/Time");

/**
 * @bardiademon
 * @param id
 * @param phone
 * @param afterLogin
 */
const login = (id , phone , afterLogin) =>
{
    let code = shaToTime (shaToSha (id.toString () , phone.toString ()));

    let linkConnect = connect ();
    if (linkConnect !== false) setLogin (id , code , linkConnect , (ok) =>
    {
        afterLogin (ok , ((ok) ? code : null));
    });
    else afterLogin (false , null);
};

/**
 * @bardiademon
 * @param id
 * @param code
 * @param linkConnect
 * @param afterSet
 */
const setLogin = (id , code , linkConnect , afterSet) =>
{
    linkConnect.query (makeQuery () , [id , time () , timePlusYear () , code , true] , (err) => afterSet (!err));
};

/**
 * @bardiademon
 * @returns {string}
 */
const makeQuery = () => ("INSERT INTO `login`(`id_acc`,`time`,`time_logout`,`code`,`credibility`) VALUES (?,?,?,?,?)");

/**
 * @bardiademon
 * @type {{login: login}}
 */
module.exports = {login};