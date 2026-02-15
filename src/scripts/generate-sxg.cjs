const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const CONFIG = {
    distDir: 'dist',
    certFile: '.certs/cert.pem',
    keyFile: '.certs/privkey.pem',
    // Hardcoded to domain to prevent usage of 'example.com' default
    certUrl: 'https://perito.barcelona/cert.cbor',
    validityUrl: 'https://perito.barcelona/resource.validity.msg',
    expire: '168h' // 7 days matching cert validity
};

async function main() {
    if (!fs.existsSync(CONFIG.keyFile)) {
        console.error('❌ Private key not found at', CONFIG.keyFile);
        process.exit(1);
    }

    console.log('Generador de SXG (Static) iniciado...');
    console.log(`DOMAIN: perito.barcelona`);
    console.log(`CERT_URL: ${CONFIG.certUrl}`);
    console.log(`VALIDITY_URL: ${CONFIG.validityUrl}`);

    // Find HTML files recursively in dist/
    const files = findHtmlFiles(CONFIG.distDir);
    console.log(`Found ${files.length} HTML files to sign.`);

    // Current time minus 1 hour to handle clock skew issues (critical fix)
    const now = new Date();
    now.setHours(now.getHours() - 1);
    const dateStr = now.toISOString();

    for (const file of files) {
        const relPath = path.relative(CONFIG.distDir, file);
        // Normalize path for URL: replace backslashes (Windows) with forward slashes
        const urlPath = relPath.replace(/\\/g, '/');
        const uri = `https://perito.barcelona/${urlPath === 'index.html' ? '' : urlPath.replace('/index.html', '/')}`;
        const outputFile = file + '.sxg';

        console.log(`Signing ${uri} -> ${outputFile} ...`);

        const args = [
            '-uri', uri,
            '-content', file,
            '-certificate', CONFIG.certFile,
            '-privateKey', CONFIG.keyFile,
            '-certUrl', CONFIG.certUrl,
            '-validityUrl', CONFIG.validityUrl,
            '-o', outputFile,
            '-expire', CONFIG.expire,
            '-date', dateStr // Backdated timestamp
        ];

        const result = spawnSync('gen-signedexchange', args, { stdio: 'inherit' });

        if (result.error) {
            console.error(`❌ Failed to run gen-signedexchange: ${result.error.message}`);
            // Check if tool is installed
        } else if (result.status !== 0) {
            console.error(`❌ Non-zero exit code signing ${uri}`);
        } else {
            // console.log(`✅ Signed ${uri}`);
        }
    }

    console.log('SXG generation complete.');
}

function findHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(findHtmlFiles(filePath));
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    });
    return results;
}

main();
