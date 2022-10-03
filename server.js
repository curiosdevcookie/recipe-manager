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

  if (path === '') {
    path = 'index.html'
  }

  // console.log(`Request received on path: ${routes}`);

  let file = __dirname + '/public/' + path;

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
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

console.log(__dirname);