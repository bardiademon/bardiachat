const mysql = require ("mysql");

/**
 * @bardiademon
 * @returns {Connection|boolean}
 */
let connect = () =>
{
    const HOST = "localhost";
    const USERNAME = "root";
    const PASSWORD = "73487712";
    const DBNAME = "bardia_chat";
    try
    {
        let linkDatabase = mysql.createConnection ({
            host: HOST ,
            user: USERNAME ,
            password: PASSWORD ,
            database: DBNAME
        });
        linkDatabase.connect ((function (err)
        {
            if (err) console.log (err);
            else console.log ("connected!");
        }));
        return linkDatabase;
    }
    catch (e)
    {
    }
    return false;
};

/**
 * @bardiademon
 * @type {{connect: connect}}
 */
module.exports = {connect};