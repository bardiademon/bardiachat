const express = require ("express");
const path = require ("path");
const app = express ();
const {viewHtml} = require ("./server/View");
const {api} = require ("./server/API/API");
const cookieParser = require ('cookie-parser');

const {getInfo} = require ('./server/API/InfoUser');

app.set ('view engine' , 'ejs');
app.set ('views' , path.join (__dirname , 'Views'));

app.use (express.json ());
app.use (express.urlencoded ({extended: true}));
app.use (express.static (path.join (__dirname , "/public")));
app.use (cookieParser ());

app.route ("/Login").get ((req , res) => viewHtml (res , "Login"));

app.route ("/Register").get ((req , res) => viewHtml (res , "Register"));

app.route ("/Chat").get ((req , res) => viewHtml (res , "Chat/Main"));
app.route ("/test").get ((req , res) =>
{
    getInfo (req , res , {} , (ok , scode , result) =>
    {
        console.log (ok);
        console.log (scode);
        console.log (result);
        res.end ();
    });
});

app.route ("/api").post (api);

app.route ("/*").get ((req , res) => viewHtml (res , "NotFound"));

app.listen (80 , () => console.log ("Start server"));