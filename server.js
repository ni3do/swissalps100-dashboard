// Swiss Alps 100 archive server: dependency-free, read-only static files.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const ROOT_REAL = fs.realpathSync(ROOT);
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.gpx': 'application/gpx+xml',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  let rel;
  try {
    rel = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
    // Make archive subdirectories behave like normal static-site routes.
    if (rel.endsWith('/')) rel += 'index.html';
  } catch { res.writeHead(404); return res.end('not found'); }
  const file = path.join(ROOT, rel);
  // realpath defeats both lexical traversal and symlink escapes
  fs.realpath(file, (err, real) => {
    const contentType = MIME[path.extname(file)];
    if (err || !real.startsWith(ROOT_REAL + path.sep) || !contentType) {
      res.writeHead(404); return res.end('not found');
    }
    fs.stat(real, (err2, st) => {
      if (err2 || !st.isFile()) { res.writeHead(404); return res.end('not found'); }
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(real).pipe(res);
    });
  });
});

server.listen(PORT, () => {
  console.log(`archive listening on :${PORT}`);
});
