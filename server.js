const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        fs.readFile('message.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            
            let messages = data ? data.split('\n') : [];
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write('<body>');
            res.write('<h1>Messages</h1>');
            res.write('<ul>');
            messages.forEach((message) => {
                if (message.trim() !== '') {
                    res.write('<li>' + message + '</li>');
                }
            });
            res.write('</ul>');
            res.write('<form action="/message" method="POST">');
            res.write('<input type="text" name="message">');
            res.write('<button type="submit">Send</button>');
            res.write('</form>');
            res.write('</body></html>');
            return res.end();
        });
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.appendFile('message.txt', message + '\n', (err) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                res.writeHead(302, { 'Location': '/' });
                return res.end();
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
