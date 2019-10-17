let hideProgress;

/**
 * @bardiademon
 * @param message
 * @param progress
 */
const showMessage = (message , progress) =>
{
    if (message === null)
    {
        hideProgress = true;
        $ ("#show-message-text").html (null);
        $ ("#show-message-progress").html ("").hide ();
    }
    else
    {
        hideProgress = false;
        if (progress) getHtmlLoading ((htmlLoading) =>
        {
            if (hideProgress === false) $ ("#show-message-progress").html (htmlLoading).show ();
        });
        $ ("#show-message-text").html (message);
    }
};

/**
 * @bardiademon
 * @param callback
 */
const getHtmlLoading = (callback) =>
{
    $.ajax
    ({
        url: "http://localhost/view/HtmlCodeSnippet/Progressbar.html" ,
        success: function (htmlLoading)
        {
            callback (htmlLoading);
        } ,
        error: function ()
        {
            callback (null);
        }
    });
};