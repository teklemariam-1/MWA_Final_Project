const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoute = require('./api/routes/products');
const dictionaryRoute = require('./api/routes/dictionary');
const cartRoute = require('./api/routes/carts');
const url = require('url');



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

app.use('/', express.static(__dirname + '/dist/eCommerce'));

app.use('*', express.static(__dirname + '/dist/eCommerce'));

app.listen(PORT, () => {
    console.log(`Server listen from ${PORT}.....`);
});
