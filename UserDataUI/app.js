const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const fs = require('fs');
const port = 8081;

const app = new express();
app.use(cors());
const httpServer = createServer(app);
//  body-parser helps in extracting this data from the request body regardless of the data's format, making it easier to handle and process within your application.
const bodyParser = require('body-parser');
//for webpack
app.use(express.static('dist'));
app.use(bodyParser.json());

// routing apis
app.get("/", function (req, res) {
    res.sendFile("index.html", { root: __dirname });
});
// To avoid unnessary routings
app.get('*',(req, res)=>{
    res.sendStatus(404).send('Content Not found');
})
//server
httpServer.listen(port, function () {
    console.log(`Listening for User UI data on http://localhost:${port}`);
});