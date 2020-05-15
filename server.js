const app = require('./app');
const port = 8081;

app.listen(port, function(){
    console.log('Express server listening on '+ port);
})