let txtPhone , txtPassword , txtName , txtEmailAddress;

/**
 * @bardiademon
 */
$ ('#btn-record').click (() =>
{
    if (checkEmpty ())
    {
        showAlert (null , null);
        showMessage ("Registering information..." , true);
        $.ajax ({
            type: "POST" ,
            url: "http://localhost/api" ,
            data: {
                'name_api': "Register" ,
                'request': {
                    "phone": '+98' + txtPhone ,
                    "password": txtPassword ,
                    "name": txtName ,
                    "email": txtEmailAddress
                }
            } ,
            success: (response) =>
            {
                showAlert (null , null);
                showMessage (null , null);

                let answer = response.result;

                if (answer.result === true)
                {
                    showAlert ("Successfully registered" , Success);
                }
                else if (answer.result === false) showAlert ("Sorry, An error occurred" , Danger);
                else showAlert (answer.result.toString () , Danger);

            } ,
            error: (xhr) =>
            {
                showAlert (null , null);
                showMessage (null , null);

                let answer = (xhr.responseText);
                answer = JSON.parse (answer);
                showAlert (answer.result.result , Danger);
            } ,

            header: "Access-Control-Allow-Origin"
        });
    }
});

/**
 * @bardiademon
 * @returns {boolean}
 */
const checkEmpty = () =>
{
    txtPhone = $ ('#txt-phone').val ();
    txtPassword = $ ('#txt-password').val ();
    txtName = $ ('#txt-name').val ();
    txtEmailAddress = $ ('#txt-email').val ();

    if (isEmpty (txtPhone)) showAlert (PHONE_IS_EMPTY , Danger);
    else if (isEmpty (txtPassword)) showAlert (PASSWORD_IS_EMPTY , Danger);
    else if (isEmpty (txtName)) showAlert (NAME_IS_EMPTY , Danger);
    else
    {
        showAlert (null , null);
        return true;
    }
    return false;
};

/**
 * @bardiademon
 * @param str
 * @returns {boolean}
 */
const isEmpty = (str) => (str === null || str === "");