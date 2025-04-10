const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3001;

const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    req.url === '/' ? 'index.html' : req.url
  );
  console.log(filePath);

  const extName = String(path.extname(filePath)).toLowerCase();

  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'text/png',
  };

  const contentType = mimeTypes[extName] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('404 : File not found Broo');
      }
    } else {
      res.writeHead(200, { 'Contnet-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
