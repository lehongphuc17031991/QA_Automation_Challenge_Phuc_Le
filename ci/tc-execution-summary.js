// ci/parse-playwright-summary.js
const fs = require('fs');

const file = 'test-results.json';
if (!fs.existsSync(file)) {
  console.error('No test-results.json found');
  process.exit(2);
}

const data = JSON.parse(fs.readFileSync(file, 'utf8'));

function collectTestsFromSuite(suite, acc) {
  if (!suite) return;

  if (suite.specs) {
    for (const spec of suite.specs) {
      if (spec.tests) acc.push(...spec.tests);
    }
  }

  if (suite.suites) {
    for (const child of suite.suites) {
      collectTestsFromSuite(child, acc);
    }
  }
}

let tests = [];
if (Array.isArray(data.suites)) {
  for (const s of data.suites) collectTestsFromSuite(s, tests);
}

let passed = 0, failed = 0, skipped = 0;

for (const t of tests) {
  // Playwright JSON reporter stores status inside results[]
  const status = t.results?.[0]?.status || t.status || t.outcome;

  if (status === 'passed') passed++;
  else if (status === 'failed') failed++;
  else if (status === 'skipped') skipped++;
}

const total = passed + failed + skipped;

fs.writeFileSync(
  'test-summary.env',
  `PASSED=${passed}\nFAILED=${failed}\nSKIPPED=${skipped}\nTOTAL=${total}\n`
);

console.log(`Wrote summary: passed=${passed} failed=${failed} skipped=${skipped} total=${total}`);