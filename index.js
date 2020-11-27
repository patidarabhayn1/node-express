const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const { runInNewContext } = require('vm');

const hostname='localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', (req, res, next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes', (req, res, next) => {
    res.end('Will Send all the dishes to you!');
});

app.post('/dishes', (req,res,next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT Operation not supported on dishes');
});

app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all the dishes');
});

app.get('/dishes/:dishId', (req, res, next) => {
    res.end('Will Send details! of the dish: ' + req.params.dishId + ' to you!');
});

app.post('/dishes/:dishId', (req,res,next) => {
    res.statusCode = 403;
    res.end('POST Operation not supported on /dishes/ ' + req.params.dishId);
});

app.put('/dishes/:dishId', (req,res,next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.params.dishId + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: '+ req.params.dishId);
});

app.use(express.static(__dirname+'/public'))

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Express Server</h1></body</html>');
});

const server=http.createServer(app);
server.listen(port, hostname , () =>{
    console.log(`Server running at http://${hostname}:${port}`);
})