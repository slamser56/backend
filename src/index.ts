import Express = require('express');
const app = Express();
import config = require('./config');
import database = require('./database');
import bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello')
});

app.post('/api', (req, res) => {
        res.json({status: true});
  });

app.listen(config.PORT, () => {
    database().then( (res) =>{
        if(res){
        console.log(`Backend listening on ${config.PORT} port!`);
    }
    }).catch((err) =>{
        console.log(err)
    })
});


