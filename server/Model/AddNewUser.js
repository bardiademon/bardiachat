const {shaToSha} = require ("../Classes/Sha");
const {connect} = require ("./ConnectDatabase");
const {time} = require ("../Classes/Time");

/**
 * @bardiademon
 * @param phone
 * @param password
 * @param name
 * @param email
 * @param afterAdd
 */
const addNew = (phone , password , name , email , afterAdd) =>
{
    const linkConnection = connect ();

    password = shaToSha (phone , password);

    let param = [phone , name , password];

    let i = 3;
    let setEmail = false;
    if ((email !== null && email !== "" && email !== undefined))
    {
        setEmail = true;
        param[i++] = email;
    }

    param[i] = time ();

    linkConnection.query (makeQuery (setEmail) , param , (err ) =>
    {
        afterAdd ((!err));
    });
};

/**
 * @bardiademon
 * @returns {string}
 */
const makeQuery = (setEmail) =>
{
    let rowEmail;

    if (setEmail) rowEmail = "`email`,";
    else rowEmail = "";

    let query = "INSERT INTO `account`(`phone`,`name`,`password`," + rowEmail + "`time`) VALUES (?,?,?,";

    if (setEmail) query += "?,";

    query += "?)";

    return query;
};

/**
 * @bardiademon
 * @type {{addNew: addNew}}
 */
module.exports = {addNew};