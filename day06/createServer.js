const http = require("node:http");

const server = http.createServer(function(req, res){
    if(req.url === "/getsecretdata"){
        res.end("There is no such secret data...");
    }
    res.end("Hello World");
})

server.listen(3000);