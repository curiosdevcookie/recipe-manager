import http from 'http';
import readFile from 'fs';
import { lookup } from 'mime-types';
import url from 'url';
import path from 'path';
import { routes } from './routes.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    if (req.url.startsWith('/static')) {
    return routes.static(req, res)
  }

  if (req.url === '/' || req.url === '/home') {
    return routes.home(req, res);
  }
  if (req.url === '/ingredients') {
    return routes.ingredients(req, res);
  }
  if (req.url === '/recipes') {
    return routes.recipes(req, res);
  }
  if (req.url === '/contact') {
    return routes.contact(req, res);
  }
  return res.end(routes.notFound(req, res));

});

server.listen(port, host, () => {
  console.log(`Server is running on port ${port}.`);
});
