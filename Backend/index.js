const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/Users.js')


const app = express();
app.use(bodyParser.json());

app.post('/register', (req, res)=>{
    const userData = req.body; 
    const user = new User(userData);

    console.log(userData)
    // user.save((err, result)=>{
    //     if(err)
    //          console.log('Saving User Error')
    //     res.status(200);
    // })
    res.status(200).send('Congrats customer '+user);
})

mongoose.connect('mongodb://localhost:27017/fadios', {useNewUrlParser:true}, (err)=>{
    if(!err)
        console.log('Connected to Mongo !!');
    
});

app.listen(3400, ()=>{console.log('Listening to port 3400')})