const http = require('http');

const server = http.createServer((req, res) => {
    // Parse the request URL
    const url = req.url;

    // Set the response header with Content-Type
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Handle different URLs
    if (url === '/home') {
        res.end('Welcome home\n');
    } else if (url === '/about') {
        res.end('Welcome to About Us page\n');
    } else if (url === '/node') {
        res.end('Welcome to my Node.js project\n');
    } else {
        res.end('404 Not Found\n'); // Return 404 for other URLs
    }
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
