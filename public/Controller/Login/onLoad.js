/**
 * @bardiademon
 */
const onLoad = () =>
{
    disabledBtn (null , null , true);
    showMessage ("A few moments" , true);
    isLogin ((login) =>
    {
        if (login) window.location.replace ("/Chat");
        else
        {
            disabledBtn (false);
            showMessage (null , false);
        }
    });
};

/**
 * @bardiademon
 * @param disabled
 */
const disabledBtn = (disabled) =>
{
    $ ('#btn-login').prop ('disabled' , disabled);
    $ ('#btn-register').prop ('disabled' , disabled);

    if (disabled)
    {
        $ ('#btn-login').addClass ('disabled');
        $ ('#btn-register').addClass ('disabled');
    }
    else
    {
        $ ('#btn-login').removeClass ('disabled');
        $ ('#btn-register').removeClass ('disabled');
    }
};

/**
 * @bardiademon
 * @param afterCheck
 */
let isLogin = (afterCheck) =>
{
    $.ajax ({
        type: "POST" ,
        url: "http://localhost/api" ,
        data: {name_api: "IsLogin"} ,
        success: (answer) =>
        {
            afterCheck ((answer.result).is_login);
        } ,
        error: () =>
        {
            afterCheck (false);
        } ,
        header: "Access-Control-Allow-Origin"
    });
};
