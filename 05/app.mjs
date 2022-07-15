import http from 'node:http';
const PORT = process.eventNames.PORT || 3000;

const server = http.createServer((request, response) => {

    response.statudCode = 200;

    response.setHeader("Content-Type", "text/html");

    response.end(`<html><body><h1>I'm learning node js...</h1></body></html>`);
})

server.listen(PORT, () => console.log(`server listening on port ${PORT}`))