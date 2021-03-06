const express = require("express");
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./Members');



const logger = require('./middleware/logger');



const app = express();



// init middleware
// app.use(logger); 

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



// init Body Parser MiddleWare:
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Homepage Route
app.get('/',(req, res)=> res.render('index', {
    title:'Member App',
    members
}));

// app.get('/',(req, res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// instead of what above are
// Set a static folder    
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on Port ${PORT}`));