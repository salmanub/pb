const fs = require('fs');
const path = require('path');
const walkSync = function (dir, filelist) {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        } else if (file.endsWith('.md')) {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};
let files = walkSync(path.join(process.cwd(), 'src', 'pages'));
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    // We want to replace `answer: "Para ofrecer una solución integral... <a href="https://humedades.barcelona">...</a>."`
    // with `answer: 'Para ofrecer una solución integral... <a href="https://humedades.barcelona">...</a>.'`
    let lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.includes('answer: "') && line.includes('<a href="https://humedades.barcelona">')) {
            // Remove the first " after answer: and the last " at the end of the line, replace with '
            lines[i] = line.replace(/answer:\s*"/, "answer: '").replace(/"\s*$/, "'");
        }
    }
    content = lines.join('\n');
    if(original !== content) {
        fs.writeFileSync(file, content);
        console.log('Fixed YAML quotes in', file);
    }
});
