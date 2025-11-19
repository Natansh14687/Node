const http = require("node:http");

const server = http.createServer(function(req, res){
    if(req.url === "/getdata"){
        res.end("There is no such data");
    }
    res.end("Hello World");
});

server.listen(7000);