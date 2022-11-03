import http from 'http';
import readFile from 'fs';
import { lookup } from 'mime-types';
import url from 'url';
import path from 'path';
import { routes } from './routes.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const host = '127.0.0.1' || 'localhost';
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  // if (req.url.startsWith('/static')) {
  //   return routes.static(req, res)
  // }

  if (req.url === '/' || req.url === '/home') {
    routes.home(req, res);
  }
  else if (req.url === '/ingredients') {
    routes.ingredients(req, res);
  }
  else if (req.url === '/recipes') {
    routes.recipes(req, res);
  }
  else if (req.url === '/contact') {
    routes.contact(req, res);
  }
  else {
    res.end(routes.notFound(req, res));
  }
});

server.listen(port, host, () => {
  console.log("listen")

  console.log(`Server is running on port ${port}.`);
});
