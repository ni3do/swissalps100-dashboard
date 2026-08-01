// Swiss Alps 100 dashboard server: static files + shared tracking state.
// Zero dependencies. GET /api/state is public; POST /api/state requires the
// TRACKING_PIN env var to be set and matched, and persists to DATA_FILE.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PIN = process.env.TRACKING_PIN || '';
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data', 'state.json');
const ROOT = __dirname;
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

function readState() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch { return {}; }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/api/state') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      return res.end(JSON.stringify(readState()));
    }
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (c) => { body += c; if (body.length > 100_000) req.destroy(); });
      req.on('end', () => {
        let state;
        try { state = JSON.parse(body); } catch { res.writeHead(400); return res.end('bad json'); }
        if (!PIN) { res.writeHead(503); return res.end('TRACKING_PIN not configured; writes disabled'); }
        if (state.pin !== PIN) { res.writeHead(401); return res.end('bad pin'); }
        delete state.pin;
        try {
          fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
          fs.writeFileSync(DATA_FILE, JSON.stringify(state));
        } catch (e) { res.writeHead(500); return res.end('write failed'); }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{"ok":true}');
      });
      return;
    }
    res.writeHead(405);
    return res.end();
  }

  const rel = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
  const file = path.join(ROOT, path.normalize(rel));
  if (!file.startsWith(ROOT + path.sep) || path.basename(file) === 'state.json') {
    res.writeHead(404); return res.end('not found');
  }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`dashboard listening on :${PORT}, state file ${DATA_FILE}, writes ${PIN ? 'enabled' : 'DISABLED (set TRACKING_PIN)'}`);
});
