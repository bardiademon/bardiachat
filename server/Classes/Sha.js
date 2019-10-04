const crypto = require ('crypto');
const js_sha256 = require ('js-sha256');

/**
 * @bardiademon
 * @param data
 * @returns {string}
 */
const sha = (data) =>
{
    const generator = crypto.createHash ('rsa-sha512');
    generator.update (data);
    return generator.digest ('hex');
};

/**
 * @bardiademon
 * @param str
 * @returns {*}
 */
const sha256 = (str) => js_sha256.create ().update (str).toString ();

/**
 * @bardiademon
 * @param str
 * @returns {*}
 */
const shaToTime = (str) => shaToSha (sha256 (str) , sha256 (new Date ().getTime ().toString ()));

/**
 * @bardiademon
 * @param str1
 * @param str2
 * @returns {*}
 */
const shaToSha = (str1 , str2) =>
{
    str1 = sha256 (str1) + sha256 (str2);
    return sha256 (str1).toString ();
};

/**
 * @bardiademon
 * @type {{sha256: (function(*=): *), shaToTime: (function(*=)), sha: (function(*=): string), shaToSha: (function(*=, *=): *)}}
 */
module.exports = {sha , sha256 , shaToSha , shaToTime};