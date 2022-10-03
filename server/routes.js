export { routes as default };

const routes = {
  '/': './public/index.html',
  '/recipes': './data/recipes/recipe-1.txt',
  '/ingredients': './data/ingredients/ingredients.json',
  '/contact': './public/pages/contact.html',
  notFound: function (data, res) {
    res.writeHead(404);
    res.end('Not Found');
  }
};