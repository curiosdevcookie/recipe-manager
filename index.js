
const http = require('http');
const { readFile } = require('fs');

const port = process.env.PORT || 3000;
const filePath = './ui/index.html';

const server = http.createServer((req, res) => {
  readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Error');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});