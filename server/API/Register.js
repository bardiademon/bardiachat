const {isLogin} = require ('./IsLogin');
const validator = require ("email-validator");
const phone = require ('phone');
const {isExistsEmail , isExistsPhone} = require ('../Model/CheckPhoneEmail');
const {addNew} = require ('../Model/AddNewUser');


let valPhone , password , name , email;

let messageCheckValue;

/**
 * @bardiademon
 * @param req
 * @param res
 * @param request
 * @param result
 */
const api = (req , res , request , result) =>
{
    isLogin (req , res , request , (ok , scode , resIsLogin) =>
    {
        if (resIsLogin.is_login === false)
        {
            if (checkValue (request) === true)
            {
                isExistsPhone (valPhone , (existsPhone , idP) =>
                {
                    if (existsPhone === true) result (false , 200 , {"result": "Phone is exists!"});
                    else
                    {
                        isExistsEmail (email , (existsEmail , idE) =>
                        {
                            if (existsEmail === true) result (false , 200 , {"result": "Email is exists!"});
                            else
                            {
                                addNew (valPhone , password , name , email , (recorded) =>
                                {
                                    result (true , 200 , {"result": recorded});
                                });
                            }
                        })
                    }
                });
            }
            else result (false , 400 , {"result": messageCheckValue});
        }
        else result (false , 200 , {"result": "is_login"});
    });
};

/**
 * @bardiademon
 * @param request
 * @returns {boolean}
 */
const checkValue = (request) =>
{

    valPhone = request.phone;
    password = request.password;
    name = request.name;

    if ((email = request.email) !== "")
    {
        if (validator.validate (email) === false)
        {
            messageCheckValue = EMAIL_INVALID;
            return false;
        }
    }

    try
    {
        let checkPhone = phone (valPhone);
        if (checkPhone[1] === "IRN")
        {
            valPhone = checkPhone[0];

            name = name.trim ();
            if (name === "")
            {
                messageCheckValue = NAME_IS_EMPTY;
                return false;
            }
            else return true;
        }
        else
        {
            messageCheckValue = PHONE_IRN;
            return false;
        }
    }
    catch (e)
    {
        messageCheckValue = PHONE_INVALID;
        return false;
    }

};

const EMAIL_INVALID = "Email is invalid!";
const PHONE_INVALID = "Phone is invalid!";
const PHONE_IRN = "Please enter only Iran number!";
const NAME_IS_EMPTY = "Name is empty!";

/**
 * @bardiademon
 * @type {{api: api}}
 */
module.exports = {api};