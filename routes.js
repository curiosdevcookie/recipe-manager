export { routes };
import fs, { readFile, readFileSync } from 'fs';
import url from 'url';
import path from 'path';
import { lookup } from 'mime-types';
import { fileURLToPath } from 'url';
import { parse } from 'querystring';
import { createReadStream } from 'fs';
import { createWriteStream } from 'fs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getContentType = (inputPath) => {
  const path = inputPath.toLowerCase();
  if (path.endsWith(".css")) {
    return "text/css";
  }
  if (path.endsWith(".js")) {
    return "application/js";
  }
  if (path.endsWith(".html")) {
    return "text/html";
  }
  return "plain/text";
}

const routes = {
  static: function (req, res) {
    let file = req.url.replace('/static/', '')
    let path = `${__dirname}/public/${file}`;
    readFile(path, (err, content) => {
      if (err) {
        return routes.notFound(err, res);
      }
      res.writeHead(200, { "Content-type": getContentType(path) });
      return res.end(content)
    })
  },
  home: function (data, res) {
    let file = `${__dirname}/public/index.html`;
    readFile(file, (err, content) => {
      if (err) {
        return routes.notFound(err, res);
      }
      res.writeHead(200, { "Content-type": getContentType(file) });
      return res.end(content)
    })
    //async read file function uses callback
    // readFileSync(file, function (err, content) {
    //   if (err) {
    //     console.log(`File Not Found ${file}`);
    //     res.writeHead(404);
    //     res.end();
    //   } else {
    //     //specify the content type in the response
    //     console.log(`Returning ${path}`);
    //     res.setHeader("X-Content-Type-Options", "nosniff");
    //     let mime = lookup(path);
    //     res.writeHead(200, { "Content-type": mime });
    //     // switch (path) {
    //     //   case "main.css":
    //     //     res.writeHead(200, { "Content-type": "text/css" });
    //     //     break;
    //     //   case "main.js":
    //     //     res.writeHead(200, { "Content-type": "application/javascript" });
    //     //     break;
    //     //   case "index.html":
    //     //     res.writeHead(200, { "Content-type": "text/html" });
    //     // }
    //     return res.end(content);
    //   }
    // })
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

