const
    Primary = "primary"
    , Secondary = "secondary"
    , Success = "success"
    , Danger = "danger"
    , Warning = "warning"
    , Info = "info"
    , Light = "light"
    , Dark = "dark";

/**
 * @bardiademon
 * @param message
 * @param name
 */
const showAlert = (message , name) =>
{
    if (message === null) $ ('#alert').removeAttr ("class").html ("");
    else $ ('#alert').addClass ("alert alert-" + name).html (message);
};