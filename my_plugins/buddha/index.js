'use strict';

const fs = require('fs');
const path = require('path');
const lineReader = require('line-reader');

class BuddhaPlugin {
  constructor(options = 'buddha') {
    this.data = '';
    switch(options) {
      case 'alpaca':
        this.readFile(path.join(__dirname, 'asserts/alpaca.txt'));
        break;
      case 'buddha': 
        this.readFile(path.join(__dirname, 'asserts/buddha.txt'));
        break;
      default: 
        this.readFile(path.join(__dirname, 'asserts/buddha.txt'));
        break;
    }
  }

  readFile(file) {
    lineReader.eachLine(file, (line, last) => {
      line = line.replace(/\\/gm, '\\\\').replace(/"/gm, '\\"');
      this.data += `;console.log("${line}");`;
    });
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      for (let k in compilation.assets) {
        if (path.extname(k) === '.js') {
          compilation.assets[k]._value += this.data;
        }
      }
      callback();
    })
  }
}

module.exports = BuddhaPlugin;
