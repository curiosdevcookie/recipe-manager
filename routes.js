export { routes as default };
import url from 'url';
import path from 'path';
import fs from 'fs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = {
  home: function (data, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(`${__dirname}/public/index.html`).pipe(res);
  },
  recipes: function (data, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(`${__dirname}/pages/recipes/recipe-1.txt`).pipe(res);
  },
  ingredients: function (data, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const someJson = {
      "ingredients": [
        { "name": "flour" },
        { "name": "sugar" },
        { "name": "eggs" },
        { "name": "butter" },
        { "name": "milk" },
        { "name": "vanilla" },
        { "name": "baking powder" },
        { "name": "salt" }
      ]
    }
    res.end(JSON.stringify(someJson));
  },
  contact: function (data, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(`${__dirname}/pages/contact.html`).pipe(res);
  },
  notFound: function (data, res) {
    res.writeHead(404);
    res.end('Not Found!');
  }
}