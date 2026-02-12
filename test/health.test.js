const { app, server } = require('../src/index');
const http = require('http');

function request(path) {
  return new Promise((resolve, reject) => {
    const addr = server.address();
    http.get(`http://127.0.0.1:${addr.port}${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
    }).on('error', reject);
  });
}

async function runTests() {
  let passed = 0;
  let failed = 0;

  function assert(name, condition) {
    if (condition) { console.log(`  ✓ ${name}`); passed++; }
    else { console.log(`  ✗ ${name}`); failed++; }
  }

  try {
    console.log('Health Check Endpoint Tests:\n');

    const start = Date.now();
    const { status, body } = await request('/health');
    const elapsed = Date.now() - start;

    assert('returns 200', status === 200);
    assert('has status field', body.status === 'ok');
    assert('has uptime_seconds (number)', typeof body.uptime_seconds === 'number');
    assert('has version field', typeof body.version === 'string');
    assert('has timestamp (ISO)', !isNaN(Date.parse(body.timestamp)));
    assert('response time < 50ms', elapsed < 50);

    console.log(`\n${passed} passed, ${failed} failed (${elapsed}ms)`);
  } finally {
    server.close();
  }
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
