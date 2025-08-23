// Reemplazar todas las instancias de [lang] con [currentLanguage]
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the file
const filePath = path.join(__dirname, 'src/_includes/layouts/contact.njk');

// Read the file content
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Replace all occurrences of [lang] with [currentLanguage]
  const result = data.replace(/\[lang\]/g, '[currentLanguage]');

  // Also replace the line in script: const currentLang = '{{ lang }}';
  const scriptFixed = result.replace("const currentLang = '{{ lang }}';", "const currentLang = '{{ currentLanguage }}';");

  // Write the modified content back to the file
  fs.writeFile(filePath, scriptFixed, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('All lang references replaced with currentLanguage successfully');
  });
});
