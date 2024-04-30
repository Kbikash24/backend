const http = require('http');
const routes= require('./routes.js')


const server = http.createServer(routes.handler);

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});
