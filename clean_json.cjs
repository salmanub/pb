const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    } else if (file.endsWith('.json')) {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

const files = walkSync(path.join(process.cwd(), 'src', '_data'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace 'Auditorías de Obra' with 'Ingeniería Forense'
    content = content.replace(/Auditor[íi]as de Obra/ig, 'Ingeniería Forense de Construcción');
    content = content.replace(/auditor[ií]as_obra/ig, 'ingenieria_forense');
    
    // CA
    content = content.replace(/Auditories d'Obra/ig, 'Enginyeria Forense de Construcció');
    content = content.replace(/Auditories d['’]Obra \(certificacions, qualitat\)/ig, 'Enginyeria Forense de Construcció');

    // ES contact form
    content = content.replace(/Auditor[ií]as de Obra \(certificaciones, calidad\)/ig, 'Ingeniería Forense de Construcción');
    
    // EN
    content = content.replace(/Construction Audits/ig, 'Civil Forensic Engineering');
    
    // FR
    content = content.replace(/Audits de Chantier/ig, 'Ingénierie Légale de Construction');
    
    // IT
    content = content.replace(/Audit di Cantiere/ig, 'Ingegneria Forense Edile');
    
    // Replace URL paths if any
    content = content.replace(/auditorias-obra/ig, 'ingenieria-forense-construccion');
    content = content.replace(/auditories-obra/ig, 'enginyeria-forense-construccio');
    content = content.replace(/construction-audits/ig, 'civil-forensic-engineering');
    content = content.replace(/audits-chantier/ig, 'ingenierie-legale-construction');
    content = content.replace(/audit-cantiere/ig, 'ingegneria-forense-costruzioni');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Cleaned JSON:', file);
    }
});
console.log('Done');
