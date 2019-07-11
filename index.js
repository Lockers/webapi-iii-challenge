const server = require('./server.js');

port = process.env.PORT

server.listen(port, () => {
    console.log(`\n* Server Running on http://localhost:${port} *\n`);
});
