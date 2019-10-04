const moment = require ("moment");

/**
 * @bardiademon
 * @returns {number}
 */
const getTimeStamp = () => (new Date ()).getTime ();

const time = () => moment ().format ("YYYY-MM-DD HH:m:s");
const timePlusYear = () => moment (new Date ()).add (1 , 'year').format ("YYYY-MM-DD HH:m:s");

/**
 * @bardiademon
 * @type {{timePlusYear: (function(): string), getTimeStamp: (function(): number), time: (function(): string)}}
 */
module.exports = {getTimeStamp , time , timePlusYear};