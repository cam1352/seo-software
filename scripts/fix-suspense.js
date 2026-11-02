const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'src/app/audit/page.tsx', oldFn: 'AuditPage', innerFn: 'AuditContent', msg: 'Loading Site Audit...' },
  { file: 'src/app/keywords/page.tsx', oldFn: 'KeywordsPage', innerFn: 'KeywordsContent', msg: 'Loading Keyword Magic...' },
  { file: 'src/app/domain/page.tsx', oldFn: 'DomainOverviewPage', innerFn: 'DomainOverviewContent', msg: 'Loading Domain Overview...' },
  { file: 'src/app/geo/page.tsx', oldFn: 'GeoTrackerPage', innerFn: 'GeoTrackerContent', msg: 'Loading GEO Tracker...' },
  { file: 'src/app/content/page.tsx', oldFn: 'ContentOptimizerPage', innerFn: 'ContentOptimizerContent', msg: 'Loading Content Assistant...' }
];

for (const p of pages) {
  const fullPath = path.join(__dirname, '..', p.file);
  let code = fs.readFileSync(fullPath, 'utf8');

  // ensure Suspense is imported
  if (!code.includes('Suspense')) {
    code = code.replace(/import\s*\{/, 'import { Suspense, ');
  }

  // rename export default function to function
  code = code.replace(`export default function ${p.oldFn}`, `function ${p.innerFn}`);

  // append export default with Suspense wrapper
  code += `\n\nexport default function ${p.oldFn}() {\n  return (\n    <Suspense fallback={<div className="p-8 text-center text-gray-400">${p.msg}</div>}>\n      <${p.innerFn} />\n    </Suspense>\n  );\n}\n`;

  fs.writeFileSync(fullPath, code, 'utf8');
  console.log('Fixed Suspense in:', p.file);
}
