var express = require('express');
var path=require('path');
var app = express();

app.set('port', (process.env.PORT||8080));

app.use(express.static(__dirname));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/src/index.html');
})

app.listen(app.get('port'),function (err) {
    if(err)
        console.log(err);
    else
        console.log('Running on port: '+ app.get('port'));
});
