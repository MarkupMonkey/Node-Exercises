const cors = require('cors');

const initCorsMiddleware = () => {
    const corsOption = {
        origin: 'http://localhost:8080',
        credentials: true
    };

    return cors(corsOption);
};

module.exports = initCorsMiddleware;
