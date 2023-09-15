const express =require("express");
const expressLayouts = require("express-ejs-layouts");
const expresslayouts = require('express-ejs-layouts');
const fileupload =require('express-fileupload');
const session =require('express-session');
const flash  = require('connect-flash');
const cookieParser = require('cookie-parser');


const app =express();

const port= process.env.PORT || 3500
require('dotenv').config();

//middlewares

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

app.use(expressLayouts)

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret:'cookingBlogSecretSession',
    saveUninitialized :true,
    resave :true
}));
app.use(flash());
app.use(fileupload);

app.set('layout','./layouts/main');

app.set('view engine' ,'ejs')

const routes=require('./server/routes/reciperoutes.js');

app.use('/', routes);

app.listen(port, ()=>{

    console.log(`listening on port ${port}`);
})