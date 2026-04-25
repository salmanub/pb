const fs = require('fs');
const path = require('path');

const srcPages = path.join(__dirname, 'src', 'pages');
const langs = ['es', 'ca', 'en', 'fr', 'it'];

// 1. DELETE auditoria-de-obras
langs.forEach(lang => {
    const dir = path.join(srcPages, lang);
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir, { recursive: true });
        files.forEach(file => {
            if (file.includes('audit') && file.endsWith('.md')) {
                fs.unlinkSync(path.join(dir, file));
                console.log('Deleted:', path.join(dir, file));
            }
        });
    }
});

// 2. _redirects
const redirectsPath = path.join(__dirname, 'src', '_redirects');
if (fs.existsSync(redirectsPath)) {
    let redirects = fs.readFileSync(redirectsPath, 'utf8');
    const newRedirects = `
# REDIRECTS FASE 1
/auditoria-de-obras/ /ingenieria-forense-construccion/ 301
/ca/auditoria-d-obres/ /ca/enginyeria-forense-construccio/ 301
/en/construction-technical-audit/ /en/civil-forensic-engineering/ 301
/fr/audit-de-construction/ /fr/ingenierie-legale-construction/ 301
/it/audit-di-costruzione/ /it/ingegneria-forense-costruzioni/ 301
`;
    fs.appendFileSync(redirectsPath, newRedirects);
    console.log('Updated _redirects');
}

// Map files
const filesToUpdate = {
    'index.md': {
        es: 'index.md',
        ca: 'index.md',
        en: 'index.md',
        fr: 'index.md',
        it: 'index.md'
    },
    'especialidades': {
        es: 'especialidades-forenses/index.md',
        ca: 'especialitats-forenses/index.md',
        en: 'forensic-specialties/index.md',
        fr: 'specialites-forensiques/index.md',
        it: 'specialita-forensi/index.md'
    },
    'ingenieria': {
        es: 'ingenieria-forense-construccion/index.md',
        ca: 'enginyeria-forense-construccio/index.md',
        en: 'civil-forensic-engineering/index.md',
        fr: 'ingenierie-legale-construction/index.md',
        it: 'ingegneria-forense-costruzioni/index.md'
    },
    'despacho': {
        es: 'el-despacho.md',
        ca: 'el-despatx.md',
        en: 'the-firm.md',
        fr: 'le-cabinet.md',
        it: 'lo-studio.md'
    },
    'honorarios': {
        es: 'honorarios.md',
        ca: 'honoraris.md',
        en: 'expert-witness-fees.md',
        fr: 'honoraires.md',
        it: 'onorari.md'
    },
    'humedades': {
        es: 'informes-periciales/humedades-filtraciones.md',
        ca: 'informes-pericials/humitats-filtracions.md',
        en: 'expert-witness-reports/moisture-water-leakage.md',
        fr: 'rapports-expertise/humidite-infiltrations.md',
        it: 'perizie-tecniche/umidita-infiltrazioni.md'
    },
    'fibra': {
        es: 'asesoramiento-estructural/refuerzo-fibra-carbono.md',
        ca: 'assessorament-estructural/reforc-fibra-carboni.md',
        en: 'structural-consulting/carbon-fiber-reinforcement.md',
        fr: 'conseil-structurel/renfort-fibre-carbone.md',
        it: 'consulenza-strutturale/rinforzo-fibra-carbonio.md'
    }
};

const texts = {
    index: {
        es: "## Autoridad B2B en Patología Estructural\n\nComo peritos judiciales en Barcelona, actuamos bajo el principio de *Duty to the Court*, aportando validación técnica independiente. Mediante Simulación FEA y análisis avanzado de fractura, resolvemos litigios B2B de alta complejidad estructural, alejándonos de informes superficiales.",
        ca: "## Autoritat B2B en Patologia Estructural\n\nCom a pèrits judicials a Barcelona, actuem sota el principi de *Duty to the Court*, aportant validació tècnica independent. Mitjançant Simulació FEA i anàlisi avançat de fractura, resolem litigis B2B d'alta complexitat.",
        en: "## B2B Authority in Structural Pathology\n\nAs judicial experts in Barcelona, we operate under the *Duty to the Court* principle, providing independent technical validation. Through FEA Simulation and advanced fracture analysis, we resolve highly complex B2B structural litigation.",
        fr: "## Autorité B2B en Pathologie Structurelle\n\nEn tant qu'experts judiciaires à Barcelone, nous agissons sous le principe de *Duty to the Court*, en fournissant une validation technique indépendante. Grâce à la simulation FEA, nous résolvons des litiges B2B complexes.",
        it: "## Autorità B2B nella Patologia Strutturale\n\nCome periti giudiziari a Barcellona, operiamo secondo il principio di *Duty to the Court*, fornendo validazione tecnica indipendente. Attraverso la simulazione FEA, risolviamo controversie B2B altamente complesse."
    },
    especialidades: {
        es: "## Hub de Especialidades Forenses\n\nAgrupamos nuestras áreas de intervención: **Colapsos y Obra Civil**, **Patología de Cimentaciones** y **Vicios Ocultos graves**. Aportamos rigor científico para cada especialidad.",
        ca: "## Hub d'Especialitats Forenses\n\nAgrupem les nostres àrees: **Col·lapses i Obra Civil**, **Patologia de Fonamentacions** i **Vicis Ocults greus**. Aportem rigor científic.",
        en: "## Forensic Specialties Hub\n\nWe group our areas of intervention: **Collapses and Civil Works**, **Foundation Pathology**, and **Severe Hidden Defects**. We provide scientific rigor.",
        fr: "## Hub des Spécialités Forensiques\n\nNous regroupons nos domaines : **Effondrements et Travaux Publics**, **Pathologie des Fondations** et **Vices Cachés graves**.",
        it: "## Hub delle Specialità Forensi\n\nRaggruppiamo le nostre aree: **Crolli e Opere Civili**, **Patologia delle Fondazioni** e **Gravi Vizi Occulti**."
    },
    ingenieria: {
        es: "## Ingeniería Civil y Mecánica de Fractura\n\nNuestro enfoque High-Ticket se centra en el cálculo estructural avanzado.\n\n$$ \\sigma = \\frac{N}{A} + \\frac{M}{W} $$\n\nDemostramos responsabilidades en colapsos estructurales.",
        ca: "## Enginyeria Civil i Mecànica de Fractura\n\nEl nostre enfocament High-Ticket se centra en el càlcul estructural avançat.\n\n$$ \\sigma = \\frac{N}{A} + \\frac{M}{W} $$\n\nDemostrem responsabilitats en col·lapses.",
        en: "## Civil Engineering and Fracture Mechanics\n\nOur High-Ticket approach focuses on advanced structural calculation.\n\n$$ \\sigma = \\frac{N}{A} + \\frac{M}{W} $$\n\nWe demonstrate liabilities in structural collapses.",
        fr: "## Ingénierie Civile et Mécanique de Rupture\n\nNotre approche High-Ticket se concentre sur le calcul structurel avancé.\n\n$$ \\sigma = \\frac{N}{A} + \\frac{M}{W} $$\n\nNous démontrons les responsabilités lors d'effondrements.",
        it: "## Ingegneria Civile e Meccanica della Frattura\n\nIl nostro approccio High-Ticket si concentra sul calcolo strutturale avanzato.\n\n$$ \\sigma = \\frac{N}{A} + \\frac{M}{W} $$\n\nDimostriamo le responsabilità nei crolli strutturali."
    },
    despacho: {
        es: "## Consultoría de Validación Técnica Independiente\n\nOperamos como validadores técnicos independientes, auditando y asumiendo responsabilidad sin sesgo hacia marcas comerciales de materiales químicos.",
        ca: "## Consultoria de Validació Tècnica Independent\n\nOperem com a validadors tècnics independents, auditant sense biaix comercial.",
        en: "## Independent Technical Validation Consulting\n\nWe operate as independent technical validators, auditing and assuming responsibility without commercial bias toward chemical material brands.",
        fr: "## Conseil en Validation Technique Indépendante\n\nNous opérons en tant que validateurs techniques indépendants, sans biais commercial envers les marques.",
        it: "## Consulenza di Validazione Tecnica Indipendente\n\nOperiamo come validatori tecnici indipendenti, assumendoci la responsabilità senza pregiudizi commerciali."
    },
    honorarios: {
        es: "## Grandes Siniestros de Construcción y Colapsos\n\nPara grandes siniestros (Desde 20.000€), justificamos nuestro valor mediante mitigación de riesgos millonarios, recálculo FEA y asunción de RC civil.",
        ca: "## Grans Sinistres de Construcció i Col·lapses\n\nPer a grans sinistres (Des de 20.000€), justifiquem el valor mitjançant mitigació de riscos i recàlcul FEA.",
        en: "## Major Construction Losses and Collapses\n\nFor major losses (From €20,000), we justify our value through million-euro risk mitigation, FEA recalculation, and assuming civil liability.",
        fr: "## Sinistres Majeurs de Construction et Effondrements\n\nPour les sinistres majeurs (À partir de 20 000€), notre valeur est justifiée par la mitigation des risques et le calcul FEA.",
        it: "## Grandi Sinistri di Costruzione e Crolli\n\nPer grandi sinistri (Da 20.000€), giustifichiamo il nostro valore attraverso la mitigazione di rischi milionari e ricalcolo FEA."
    },
    humedades: {
        es: "## Enfoque Físico y Termodinámico\n\nAnalizamos las humedades desde la termodinámica. Para ejecución material, contacte a [nuestra división especializada](https://humedades.barcelona).",
        ca: "## Enfocament Físic i Termodinàmic\n\nAnalitzem les humitats des de la termodinàmica. Per execució, contacteu [nostra divisió](https://humedades.barcelona).",
        en: "## Physical and Thermodynamic Approach\n\nWe analyze dampness using thermodynamics. For material execution, contact [our specialized division](https://humedades.barcelona).",
        fr: "## Approche Physique et Thermodynamique\n\nNous analysons l'humidité via la thermodynamique. Pour l'exécution, contactez [notre division spécialisée](https://humedades.barcelona).",
        it: "## Approccio Fisico e Termodinamico\n\nAnalizziamo l'umidità attraverso la termodinamica. Per l'esecuzione materiale, contattare [la nostra divisione](https://humedades.barcelona)."
    },
    fibra: {
        es: "## Auditoría y Asunción de RC\n\nCalculamos, auditamos y asumimos RC. La ejecución corre a cargo de nuestras divisiones homologadas: [Urbenis](https://urbenis.com) y [Refuerzo Fibra](https://refuerzofibra.es).",
        ca: "## Auditoria i Assumpció de RC\n\nCalculem, auditem i assumim RC. Execució a càrrec de [Urbenis](https://urbenis.com) i [Refuerzo Fibra](https://refuerzofibra.es).",
        en: "## Auditing and Assuming Liability\n\nWe calculate, audit, and assume civil liability. Execution is handled by approved divisions: [Urbenis](https://urbenis.com) and [Refuerzo Fibra](https://refuerzofibra.es).",
        fr: "## Audit et Responsabilité Civile\n\nNous calculons et assumons la RC. L'exécution est confiée à [Urbenis](https://urbenis.com) et [Refuerzo Fibra](https://refuerzofibra.es).",
        it: "## Audit e Assunzione di Responsabilità\n\nCalcoliamo e ci assumiamo la RC. L'esecuzione è affidata a [Urbenis](https://urbenis.com) e [Refuerzo Fibra](https://refuerzofibra.es)."
    }
};

function processFile(filePath, type, lang) {
    if (!fs.existsSync(filePath)) {
        console.log('Skipping (not found):', filePath);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extracción de frontmatter y markdown puro
    const parts = content.split('---');
    if (parts.length >= 2) {
        let frontmatter = parts[1];
        let body = parts.length >= 3 ? parts.slice(2).join('---') : '';

        // Limpiar HTML
        body = body.replace(/<[^>]*>?/gm, '');

        // Reemplazar menciones no deseadas
        if (type === 'index') {
            body = body.replace(/tasaciones/gi, '');
        }
        if (type === 'despacho') {
            body = body.replace(/BASF/gi, '');
        }

        // Agregar el texto de FASE 2 y 3
        const newText = texts[type] && texts[type][lang] ? texts[type][lang] : '';
        if (newText && !body.includes(newText)) {
            body = "\n\n" + newText + "\n\n" + body;
        }

        const newContent = "---\n" + frontmatter + "---" + body;
        fs.writeFileSync(filePath, newContent);
        console.log('Updated:', filePath);
    }
}

for (const [type, files] of Object.entries(filesToUpdate)) {
    for (const [lang, relPath] of Object.entries(files)) {
        const fullPath = path.join(srcPages, lang, relPath);
        processFile(fullPath, type, lang);
    }
}
