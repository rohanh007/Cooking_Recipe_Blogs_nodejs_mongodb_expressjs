const express =require("express");
const expressLayouts = require("express-ejs-layouts");
const expresslayouts = require('express-ejs-layouts');
const fileupload =require('express-fileupload');
const session =require('express-session');
const flash  = require('connect-flash');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const MongoDBStore =require('connect-mongodb-session')(session);


const app =express();

const port= process.env.PORT || 5500
require('dotenv').config();



app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// app.use(express.static('public'))
app.use(express.static('public', { 'extensions': ['html', 'css'] }));


app.use(expressLayouts)

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret:'cookingBlogSecretSession',
    saveUninitialized :true,
    resave :true
}));
app.use(flash());
app.use(fileupload());

app.set('layout','./layouts/main');

app.set('view engine' ,'ejs');

const routes=require('./server/routes/reciperoutes.js');

app.use('/', routes);

app.listen(port, ()=>{

    console.log(`listening on port ${port}`);
})