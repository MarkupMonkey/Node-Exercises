import http from 'node:http';
const PORT = process.eventNames.PORT || 3500;

const server = http.createServer((request, response) => {
    response.statusCode = 200;

    response.setHeader("Content-Type", "application/json");

    response.end(JSON.stringify({ location: "Mars" }));

})

server.listen(PORT, () => console.log(`server running on ${PORT}`)) //< Content-Length: 19