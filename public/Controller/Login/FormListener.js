$ ("#btn-login").click (() =>
{
    const txtPhone = $ ('#txt-phone').val ();
    const txtPassword = $ ('#txt-password').val ();
    if (txtPhone === "" || txtPassword === "")
        showAlert ("Please enter info" , Danger);
    else
    {
        showAlert (null , null);
        showMessage ("Checking information" , true);
        $.ajax ({
            type: "POST" ,
            url: 'http://localhost/api' ,
            data: {'name_api': "Login" , 'request': {"phone": "+98" + txtPhone , "password": txtPassword}} ,
            success: (res) =>
            {
                showMessage (null , false);

                if (res.scode === 200 && res.ok === true)
                {
                    showAlert ("The information is correct" , Success);
                    showMessage ("Now transition to chat" , true);
                    window.location.replace ("/Chat");
                }
                else showAlert ("The information is incorrect" , Danger);
            } ,
            error: () =>
            {
                showMessage (null , false);
                showAlert ("Internal Server Error" , Danger);
            } ,
            header: "Access-Control-Allow-Origin"
        })

    }
});
$ ("#btn-register").click (() => window.location.replace ("/Register"));