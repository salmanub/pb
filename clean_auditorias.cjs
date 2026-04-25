const fs = require('fs');
const path = require('path');
const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    } else if (file.endsWith('.md') || file.endsWith('.njk')) {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

const files = walkSync(path.join(process.cwd(), 'src'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Remove from relatedProblems lists (yaml blocks)
    // - title: 'Auditorías de Obra'
    //   description: ...
    //   url: ...
    content = content.replace(/[\ \t]*-\s*title:\s*['"]?(Auditorías de Obra|Auditories d'Obra|Construction Audits|Audits de Chantier|Audit di Cantiere)['"]?[\s\S]*?(url:.*?[\r\n]+)/ig, '');

    // From contact forms options
    content = content.replace(/[\ \t]*-\s*['"]?(Auditorías de Obra|Auditories d'Obra|Construction Audits|Audits de Chantier|Audit di Cantiere).*?['"]?[\r\n]+/ig, '');

    // Replace inline text mentions where it says 'auditoría de obra' or 'auditorías de obra' -> 'ingeniería forense'
    content = content.replace(/auditorías? de obras?/ig, 'ingeniería forense');
    content = content.replace(/auditories? d'?obres?/ig, 'enginyeria forense');
    content = content.replace(/construction audits?/ig, 'forensic engineering');
    content = content.replace(/audits? de chantiers?/ig, 'ingénierie légale');
    content = content.replace(/audits? di cantiere?/ig, 'ingegneria forense');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Cleaned:', file);
    }
});
console.log('Cleanup complete');
