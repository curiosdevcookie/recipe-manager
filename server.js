import http from 'http';
import routes from './routes.js';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {

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
  console.log(`Server is running on port ${port}.`);
});