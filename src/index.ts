import Express = require('express');
const app = Express();
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(config.Mongoose, {useNewUrlParser: true, useUnifiedTopology: true});



app.get('/', (req, res) => {
    res.send('Hello')
});

app.post('/api', (req, res) => {
        res.json({status: mongoose.connection.readyState});
  });



app.listen(config.PORT, () => {
    console.log(`Backend listening on ${config.PORT} port!`);
});


