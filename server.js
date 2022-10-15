const express = require('express');
const mongoose =require('mongoose');
const methodOverRide = require('method-override');
const app = express();
const articleRoutes = require('./routes/articles');

const port  = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/blog')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(methodOverRide('_method'));

app.use('/articles', articleRoutes );

app.listen(port , (req,res)=>{
    console.log(`App started on port - ${port}`);
})