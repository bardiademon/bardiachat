const {connect} = require ("./ConnectDatabase");


const isExistsPhone = (phone , afterCheck) =>
{
    if (phone !== null && phone !== "" && phone !== undefined)
    {
        const linkConnection = connect ();

        if (linkConnection !== null)
        {
            linkConnection.query (makeQuery ('phone') , [phone] , (error , results) =>
            {
                afterCheck ((!error && results.length > 0) , ((results.length > 0) ? (results[0]).id : 0));
            });
        }
        // afterCheck (exists_phone , id_if_found);
        else afterCheck (false , 0);
    }
};


const isExistsEmail = (email , afterCheck) =>
{
    if (email !== null && email !== "" && email !== undefined)
    {
        const linkConnection = connect ();

        if (linkConnection !== null)
        {
            linkConnection.query (makeQuery ('email') , [email] , (error , results) =>
            {
                afterCheck ((!error && results.length > 0) , ((results.length > 0) ? (results[0]).id : 0));
            });
        }
        // afterCheck (exists_phone , id_if_found);
        else afterCheck (false , 0);
    }
};

const makeQuery = (nameRow) => "SELECT `id` FROM `account` WHERE `" + nameRow + "`=?";

module.exports = {isExistsPhone , isExistsEmail};