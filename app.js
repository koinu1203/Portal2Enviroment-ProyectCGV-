const express = require('express')

const app = express()

app.use(express.static(__dirname+'/assets'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/src/index.html');
})

app.listen(3000, ()=>{
    console.log('server running on port', 3000)
});
