const express = require ('express');
const app = express ();

const http = require ('http').Server (app);
const io = require ('socket.io') (http);

/**
 * @bardiademon
 */
app.route ("/").get ((req , res) =>
{
    res.end ("Hello World");
});

/**
 * @bardiademon
 */
io.on ("connection" , (socket) =>
{
    socket.on ("get_list_chat" , (data) =>
    {

    });
});


const checkIsLogin = (code , AfterCheck) =>
{

};

http.listen (8183);

console.log ("Connect Port 8183");