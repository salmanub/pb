const fs = require('fs');
const path = require('path');
const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    } else if (file.endsWith('.md')) {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

const defaultTitles = {
    'El Despacho': { es: 'El Despacho', ca: 'El Despatx', en: 'The Firm', fr: 'Le Cabinet', it: 'Lo Studio' },
    'Especialidades Forenses': { es: 'Especialidades Forenses', ca: 'Especialitats Forenses', en: 'Forensic Specialties', fr: 'Spécialités Forensiques', it: 'Specialità Forensi' },
    'Ingeniería Forense': { es: 'Ingeniería Forense de Construcción', ca: 'Enginyeria Forense de Construcció', en: 'Civil Forensic Engineering', fr: 'Ingénierie Légale de Construction', it: 'Ingegneria Forense Edile' },
    'Refuerzo Estructural': { es: 'Refuerzo Estructural', ca: 'Reforç Estructural', en: 'Structural Reinforcement', fr: 'Renforcement Structurel', it: 'Rinforzo Strutturale' },
    'Vicios Ocultos': { es: 'Vicios Ocultos en Edificación', ca: 'Vicis Ocults en Edificació', en: 'Hidden Defects in Buildings', fr: 'Vices Cachés dans le Bâtiment', it: 'Vizi Occulti in Edilizia' },
    'Humedades y Filtraciones': { es: 'Humedades y Filtraciones', ca: 'Humitats i Filtracions', en: 'Damp and Leaks', fr: 'Humidité et Infiltrations', it: 'Umidità e Infiltrazioni' },
    'Honorarios': { es: 'Honorarios', ca: 'Honoraris', en: 'Fees', fr: 'Honoraires', it: 'Onorari' },
    "Casos de Éxito": { es: "Casos de Éxito", ca: "Casos d'Èxit", en: "Success Cases", fr: "Cas de Succès", it: "Casi di Successo" },
    'Contacto': { es: 'Contacto', ca: 'Contacte', en: 'Contact', fr: 'Contact', it: 'Contatti' }
};

const identifyType = (filePath) => {
    let p = filePath.toLowerCase();
    if (p.includes('el-despacho') || p.includes('el-despatx') || p.includes('the-firm') || p.includes('le-cabinet') || p.includes('lo-studio')) return 'El Despacho';
    if (p.includes('especialidades-forenses') || p.includes('especialitats-forenses') || p.includes('specialites-forensiques') || p.includes('specialites-legales') || p.includes('specialita-forensi') || p.includes('forensic-specialties')) return 'Especialidades Forenses';
    if (p.includes('ingenieria-forense-construccion') || p.includes('enginyeria-forense-construccio') || p.includes('civil-forensic-engineering') || p.includes('ingenierie-legale-construction') || p.includes('ingegneria-forense-costruzioni')) return 'Ingeniería Forense';
    if (p.includes('refuerzo-fibra-carbono') || p.includes('reforc-fibra-carboni') || p.includes('carbon-fiber-reinforcement') || p.includes('renforcement-fibre-carbone') || p.includes('rinforzo-fibra-carbonio')) return 'Refuerzo Estructural';
    if (p.includes('vicios-ocultos') || p.includes('vicis-ocults') || p.includes('hidden-defects') || p.includes('vices-caches') || p.includes('vizi-occulti')) return 'Vicios Ocultos';
    if (p.includes('humedades-filtraciones') || p.includes('humitats-filtracions') || p.includes('damp-leaks') || p.includes('humidite-infiltrations') || p.includes('umidita-infiltrazioni')) return 'Humedades y Filtraciones';
    if (p.includes('honorarios') || p.includes('honoraris') || p.includes('expert-witness-fees') || p.includes('honoraires') || p.includes('onorari')) return 'Honorarios';
    if (p.includes('casos-exito') || p.includes('casos-exit') || p.includes('casos-d-exit') || p.includes('success-cases') || p.includes('cas-succes') || p.includes('succes') || p.includes('casi-successo') || p.includes('casi-di-successo')) return 'Casos de Éxito';
    if (p.includes('contacto') || p.includes('contacte') || p.includes('contact') || p.includes('contatti') || p.includes('contatto')) return 'Contacto';
    if (p.endsWith('es/index.md') || p.endsWith('ca/index.md') || p.endsWith('en/index.md') || p.endsWith('fr/index.md') || p.endsWith('it/index.md') || p.endsWith('es\\\\index.md') || p.endsWith('ca\\\\index.md') || p.endsWith('en\\\\index.md') || p.endsWith('fr\\\\index.md') || p.endsWith('it\\\\index.md')) return 'Inicio';
    return 'Other';
};

const files = walkSync(path.join(process.cwd(), 'src', 'pages'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let langMatch = content.match(/lang:\s*['"]?([a-z]{2})['"]?/);
    let lang = langMatch ? langMatch[1] : 'es';
    let type = identifyType(file);
    
    // Replace the entire eleventyNavigation block
    // It captures "eleventyNavigation:" and any subsequent lines that start with at least 2 spaces
    let regex = /eleventyNavigation:\r?\n(?:\s{2,}.*?(?:\r?\n|$))*/g;
    
    let newNavBlock = '';
    if (type === 'Other' || type === 'Inicio') {
        newNavBlock = 'eleventyNavigation:\\n  notshow: true\\n';
    } else {
        let t = defaultTitles[type][lang];
        if (type === 'El Despacho') newNavBlock = 'eleventyNavigation:\\n  key: "El Despacho"\\n  title: "' + t + '"\\n  order: 1\\n';
        else if (type === 'Especialidades Forenses') newNavBlock = 'eleventyNavigation:\\n  key: "Especialidades Forenses"\\n  title: "' + t + '"\\n  order: 2\\n';
        else if (type === 'Ingeniería Forense') newNavBlock = 'eleventyNavigation:\\n  key: "Ingeniería Forense de Construcción"\\n  parent: "Especialidades Forenses"\\n  title: "' + t + '"\\n  order: 1\\n';
        else if (type === 'Refuerzo Estructural') newNavBlock = 'eleventyNavigation:\\n  key: "Refuerzo Estructural"\\n  parent: "Especialidades Forenses"\\n  title: "' + t + '"\\n  order: 2\\n';
        else if (type === 'Vicios Ocultos') newNavBlock = 'eleventyNavigation:\\n  key: "Vicios Ocultos en Edificación"\\n  parent: "Especialidades Forenses"\\n  title: "' + t + '"\\n  order: 3\\n';
        else if (type === 'Humedades y Filtraciones') newNavBlock = 'eleventyNavigation:\\n  key: "Humedades y Filtraciones"\\n  parent: "Especialidades Forenses"\\n  title: "' + t + '"\\n  order: 4\\n';
        else if (type === 'Honorarios') newNavBlock = 'eleventyNavigation:\\n  key: "Honorarios"\\n  title: "' + t + '"\\n  order: 3\\n';
        else if (type === 'Casos de Éxito') newNavBlock = 'eleventyNavigation:\\n  key: "Casos de Éxito"\\n  title: "' + t + '"\\n  order: 4\\n';
        else if (type === 'Contacto') newNavBlock = 'eleventyNavigation:\\n  key: "Contacto"\\n  title: "' + t + '"\\n  order: 5\\n';
    }

    newNavBlock = newNavBlock.replace(/\\n/g, '\n');

    if (regex.test(content)) {
        content = content.replace(regex, newNavBlock);
    } else {
        // Insert after lang: or permalink: if eleventyNavigation does not exist
        if (/(lang:\s*['"]?[a-z]{2}['"]?\r?\n)/.test(content)) {
            content = content.replace(/(lang:\s*['"]?[a-z]{2}['"]?\r?\n)/, '$1' + newNavBlock);
        } else if (/(permalink:.*?\r?\n)/.test(content)) {
            content = content.replace(/(permalink:.*?\r?\n)/, '$1' + newNavBlock);
        } else {
            content = content.replace(/---\r?\n/, '---\n' + newNavBlock);
        }
    }
    fs.writeFileSync(file, content, 'utf8');
});
console.log('🧭 [NAVBAR REESTRUCTURADA CON ÉXITO] 🧭');
console.log('===================================================');
console.log('¡Albert, el menú de navegación ha sido jerarquizado!');
console.log('✔️ Opciones anidadas bajo "Especialidades Forenses".');
console.log('✔️ Elementos basura eliminados del menú principal.');
console.log('✔️ Configuración eleventyNavigation sincronizada en los 5 idiomas.');
console.log('===================================================');
