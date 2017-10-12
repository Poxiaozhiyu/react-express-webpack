'use strict';

const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');

const PORT = 8888;

const app = express();

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

let users = [
  {
    id:1,
    name: 'Lixiaoyu',
    age: 32
  },{
    id:2,
    name: 'Liyuanze',
    age: 5
  },{
    id:3,
    name: 'Liyuanzhi',
    age: 1
  }
];

app.get('/user', (req, res) => {
  res.json(users);
});

app.get('/user/:id', (req, res) => {
  users.forEach(item => {
    if (item.id == req.params.id) {
      res.json(item);
    }
  });
  res.json({});
});

// Not Found page
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Page
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err;
  if (req.app.get('env') !== 'development') {
    delete res.locals.error.stack;
  }

  res.status(err.status || 500);
  res.render('error');
});


app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
});