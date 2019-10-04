const {ReadFile} = require ("./IO/ReadFile");
const path = require ("path");

/**
 * @bardiademon
 * @param res
 * @param htmlName
 */
const viewHtml = (res , htmlName) =>
{
    let pathView = path.join (path.dirname (__dirname) , 'public' , 'view' , htmlName + ".html")

    let readFile = new ReadFile ();

    let html = readFile.read (pathView);
    if (html != null)
    {
        res.contentType ("text/html");
        res.write (html);
        res.end ();
    }
    else viewHtml ("NotFound");
};

/**
 * @bardiademon
 * @type {{viewHtml: viewHtml}}
 */
module.exports = {viewHtml};