/**
 * @bardiademon
 * @param message
 * @param progress
 */
const showMessage = (message , progress) =>
{
    if (message === null)
    {
        $ ("#show-message-text").html ("");
        $ ("#show-message-progress").html ("");
    }
    else
    {
        if (progress) getHtmlLoading ((htmlLoading) =>
        {
            $ ("#show-message-progress").html (htmlLoading);
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
}