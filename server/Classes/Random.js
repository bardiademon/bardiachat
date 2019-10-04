/**
 * @bardiademon
 * @param min
 * @param max
 * @returns {*}
 */
const random = (min , max) => Math.floor(Math.random() * (max - min) + min);

/**
 * @bardiademon
 * @type {{random: (function(*, *): number)}}
 */
module.exports = {random};