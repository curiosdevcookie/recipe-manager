import http from 'http';
import url from 'url';
import { readFile } from 'fs';

import routes from './routes.js';

const port = process.env.PORT || 3000;
const filePath = './public/ui/index.html';

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const route = routes[pathname];

  if (route) {
    readFile(route, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error');
      } else {
        res.writeHead(200);
        res.end(data);
      }
    });
  } else {
    readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error');
      } else {
        res.writeHead(200);
        res.end(data);
      }
    });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

