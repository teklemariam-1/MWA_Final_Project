const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

const User = require('./models/Users.js')


const app = express();
app.use(bodyParser.json());

app.post('/register', (req, res)=>{
    const userData = req.body; 
    const user = new User(userData);

    console.log(userData)
    user.save((err, result)=>{
        if(err)
             console.log('Saving User Error')
        res.status(200).send('Congrats');
    })

})

app.post('/login', async (req, res)=>{
    const loginData = req.body;

    const user = await User.findOne({email: loginData.email});

    if(!user)
        return res.status(401).send({message:"Email or Password Invalid !"})
    
    bcrypt.compare(loginData.pwd, user.pwd, (err, isMatch)=>{
        if(!isMatch){
            return res.status(401).send({message:"Email or Password Invalid by BCRYPT !"})
        }
        
        let payload = {}

        let token = jwt.encode(payload, '123');
         res.status(200).send({token}).send('You are in')
      //  res.send('You are in')
    })
})

mongoose.connect('mongodb://localhost:27017/fadios', {useNewUrlParser:true}, (err)=>{
    if(!err)
        console.log('Connected to Mongo !!');
    
});

app.listen(3000, ()=>{console.log('Listening to port 3000')})