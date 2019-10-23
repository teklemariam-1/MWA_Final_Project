const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoute = require('./api/routes/products');
const dictionaryRoute = require('./api/routes/dictionary');
const cartRoute = require('./api/routes/carts');
const url = require('url');

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');

const User = require('./models/Users.js')

 mongoose.Promise = Promise;

 mongoose.connect("mongodb+srv://tekle:Tss7czm5AY9QOjZC@cluster0-pzawy.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true})

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/api/products', productRoute);
app.use('/api/dictionary', dictionaryRoute);
app.use('/api/cart', cartRoute);


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

app.listen(PORT, () => {
    console.log(`Server listen from ${PORT}.....`);
});
