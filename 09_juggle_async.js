const http = require('http');
const bl = require('bl');
const async = require('async');

const urls = process.argv.slice(2);

// Stephen's preferred solution with the async library
async.eachSeries(urls, function(url, next) {
  http.get(url, function(response) {
    response.pipe(bl(function(err, data) {
      data = data.toString();
      console.log(data);
      next();
    }));
  });
});

// An example of "callback hell"
http.get(url, function(response) {
  response.pipe(bl(function(err, data) {
    data = data.toString();
    console.log(data);
    http.get(url, function(response) {
      response.pipe(bl(function(err, data) {
        data = data.toString();
        console.log(data);
        http.get(url, function(response) {
          response.pipe(bl(function(err, data) {
            data = data.toString();
            console.log(data);
          }));
        });
      }));
    });
  }));
});
