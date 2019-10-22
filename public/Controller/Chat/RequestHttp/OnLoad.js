/**
 * @bardiademon
 */
const onLoad = () =>
{
    $ ('#status').text ("Get Your Profile");
    getInfoUser ((wasGet , answer) =>
    {
        if (wasGet)
        {
            $ ('.name-user').text (answer.name);
            $ ('#phone-user').text (answer.phone);
            if (answer.img !== null) $ ('#img-user').attr ("src" , answer.img);

            connectGeneral ();
        }
        else
        {
            $ ('#dialog-warning-title').text ('Get Your Profile');
            $ ('#dialog-warning-body').text ('We were unable to get your account information from the server!');

            $ ('#dialog-warning').modal ('show');
            $ ('#dialog-warning-btn-ok').click (() =>
            {
                $.removeCookie ('code');
                window.location.replace ("/Login");
            });
            $ ('#dialog-warning-try-again').click (() =>
            {
                tryAgain ();
            });
            tryAgain ();
        }
    });
};

const tryAgain = () =>
{
    $ ('#dialog-warning').modal ('hide').on ('hidden.bs.modal' , function (e)
    {
        onLoad ();
    });
};

const getInfoUser = (afterGet) =>
{
    $.ajax ({
        type: "POST" ,
        url: "http://localhost/api" ,
        data: {name_api: "InfoUser"} ,
        success: (answer) =>
        {
            afterGet ((answer.ok && answer.scode === 200) , answer.result);
        } ,
        error: (request , status , error) =>
        {
            afterGet (false , null);
        } ,
        header: "Access-Control-Allow-Origin"
    });
};