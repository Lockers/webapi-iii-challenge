const express = require('express');
const userRouter = require('./users/userRouter.js')

const server = express();

server.use(express.json())
server.use('/', userRouter);
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

// custom middleware

function logger(req, res, next) {
  console.log(`Request Method: ${req.method} Request URL: ${req.url} ${Date()}`)
  next()
};

module.exports = server;
