'use strict';

const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');

const PORT = 8888;

let app = express();

// 设置icon
// app.use(favicon(path.join(__dirname, 'static', 'image/favicon.png')));
// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 设置静态文件路径
app.use(express.static(path.join(__dirname, 'static')));

app.use((req, res, next) => {
  res.locals = {
    webTitle: require('./package.json').name
  };
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/user', (req, res) => {
  res.render('user');
});


app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
});