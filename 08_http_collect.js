const http = require('http');
const bl = require('bl');

const url = process.argv[2];

http.get(url, response => {
  response.pipe(bl((err, data) => {
    if (err) return console.error(err);
    data = data.toString();
    console.log(data.length);
    console.log(data);
  }));
});


// Another solution without using pipes
http.get(url, response => {
  let result = "";
  response.setEncoding('utf8');

  response.on('error', (err) => {
    console.error(err);
  });

  response.on('data', (data) => {
    result += data;
  });

  response.on('end', () => {
    console.log(result.length);
    console.log(result);
  });
});
