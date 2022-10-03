import http from 'http';
import path from 'path';
import { parse, fileURLToPath } from 'url';
import { readFile } from 'fs';
import { lookup } from 'mime-types';

import routes from './server/routes.js';

const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const server = http.createServer((req, res) => {
  let parsedURL = parse(req.url, true);
  let path = parsedURL.path.replace(/^\/+|\/+$/g, '');

  console.log(`Request received on path: ${routes}`);
  console.log(`Request received on path: ${path}`);

  if (path === '') {
    path = 'index.html'
  }

  const file = __dirname + '/public/' + path;
  const { pathname } = parse(req.url);
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
    readFile(file, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
      } else {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.writeHead(200, { 'Content-Type': lookup(path) });
        res.end(content);
      }
    });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

// console.log(__dirname/*, __filename*/);
// console.log(http.METHODS);
// console.log(http.StatusCodes);
