const { createServer } = require("node:http");

const createApp = () => {
    return createServer((request, response) => {
        response.statusCode = 200;

        response.setHeader("Content-Type", "text/html");

        response.end(`<html><body>Welcome to the World Wide Web!</body></html>`)
    })

   
} 

module.exports = createApp;