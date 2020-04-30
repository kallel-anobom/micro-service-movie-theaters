const express = require('express');
const http = require('http');
const httpProxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const app = express();

const moviesServiceProxy = httpProxy('http://localhost:3002');
const cinemaCatalogServiceProxy = httpProxy('http://localhost:3001');

app.get('/movies', (req, res, next) => {
  moviesServiceProxy(req, res, next);
});

app.get('/cities', (req, res, next) => {
  cinemaCatalogServiceProxy(req, res, next);
});

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const server = http.createServer(app);
server.listen(4200);

