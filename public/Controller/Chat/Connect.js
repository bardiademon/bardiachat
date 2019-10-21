let SocketIO;

let retry = 1;
let counter = 0;
let timr;
let afterConnect;

/**
 * @bardiademon
 * @param AfterConnect
 */
const Connect = (AfterConnect) =>
{
    afterConnect = AfterConnect;
    $ ('#status').click (() =>
    {
        timerStop ();
        counter = 0;
        retry = 2;
        $ ('#status').text ("Connecting 0s....");
        if (!con ()) timr.play ();
    });
    timr = $.timer (() =>
    {
        if (counter-- <= 0)
        {
            if (!con ())
            {
                if (retry >= 60) retry = 1;
                counter = retry *= 2;
                $ ('#status').text ("Connecting " + counter + "s....");
            }
        }
        else $ ('#status').text ("Connecting " + counter + "s....");
    });
    timr.set ({time: 1000 , autostart: true});
};

/**
 * @bardiademon
 * @returns {boolean}
 */
const con = () =>
{
    if (SocketIO === undefined || !SocketIO.connected) SocketIO = io ('http://localhost:8183');

    if (SocketIO !== undefined && SocketIO.connected)
    {
        timr.pause ();
        timr.stop ();
        $ ('#status').text ("Connected!").off ('click');
        afterConnect ();
        return true;
    }
    else return false;
};

/**
 * @bardiademon
 */
const timerStop = () =>
{
    timr.pause ();
    timr.stop ();
};