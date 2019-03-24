const express = require('express');
const path = require('path');



//Init Express
const app = express();

//Setup public folder for JS files
app.use(express.static(path.join(__dirname, 'public')));


//Setup View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



//Home Route
app.get('/', function(req,res){
    res.render('index.html');
          
});



app.listen(3000,function(){
    console.log('Server started on port 3000...');
});

