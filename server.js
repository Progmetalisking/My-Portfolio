// ==========================================================================
// 100% PURE NODE.JS SERVER (ZERO PACKAGES / ZERO INSTALLATION REQUIRED!)
// Built using only Node's native built-in libraries: http, fs, and path.
// ==========================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') reqUrl = '/index.html';

  // Check root directory first, then public/
  let filePath = path.join(__dirname, reqUrl);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'public', reqUrl);
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1><p><a href="/">Return to Portfolio</a></p>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('====================================================');
  console.log('🚀 Portfolio server is LIVE!');
  console.log(`👉 Open in your browser: http://localhost:${PORT}`);
  console.log('Press Ctrl + C in Git Bash to stop the server.');
  console.log('====================================================');
});
