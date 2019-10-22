const {connect} = require ('./ConnectDatabase');

/**
 * @bardiademon
 * @param idUser
 * @param afterGet
 */
const getInfoUser = (idUser , afterGet) =>
{
    const linkConnection = connect ();
    if (linkConnection !== null)
    {
        linkConnection.query (makeQuery () , [idUser] , (err , result) =>
        {
            if (err) afterGet (false , null);
            else
            {
                if (result.length > 0)
                {
                    result = result[0];
                    afterGet (true , {"phone": result.phone , "name": result.name , "img": result.img});
                }
                else afterGet (false , null);
            }
        })
    }
    else afterGet (false , null);
};


/**
 * @bardiademon
 * @returns {string}
 */
const makeQuery = () => "SELECT `phone`,`img`,`name` FROM `account` WHERE `id`=?";

/**
 * @bardiademon
 * @type {{getInfoUser: getInfoUser}}
 */
module.exports = {getInfoUser};