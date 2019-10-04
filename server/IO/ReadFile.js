const {readFileSync , existsSync} = require ('fs');
const autoBind = require ('auto-bind');

/**
 * @bardiademon
 */
class ReadFile
{
    /**
     * @bardiademon
     */
    constructor ()
    {
        autoBind (this);
    }

    /**
     * @bardiademon
     * @param path
     * @returns {string|null}
     */
    read (path)
    {
        if (existsSync (path))
        {
            try
            {
                let buffer = readFileSync (path);
                this.value = buffer.toString ();
                return this.value;
            }
            catch (e)
            {
                return null;
            }
        }
        else return null;

    }
}

/**
 * @bardiademon
 * @type {{ReadFile: ReadFile}}
 */
module.exports = {ReadFile};
