const http = require('http');

const server = http.createServer((req, res) => {
    // Set the response header with Content-Type
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Log my name to the console
    console.log("My name is Bikash");

    // Write my name as the response
    res.end('My name is Bikash\n');
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
