const fs = require("fs");
const path = require("path");

let baseDir = __dirname;

let result = {
    html: [],
    js: [],
    programming: []
};

function scanFolder(folderPath) {
    let items = fs.readdirSync(folderPath);

    items.forEach(item => {
        let fullPath = path.join(folderPath, item);
        let stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            scanFolder(fullPath);
        } else {
            let relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");

            if (relativePath.includes("HTML Assignments") && item.endsWith(".html")) {
                result.html.push(relativePath);
            }

            else if (relativePath.includes("Javascript assignments") && item.endsWith(".html")) {
                result.js.push(relativePath);
            }

            else if (relativePath.includes("Programming")) {
                result.programming.push({
                    name: item,
                    path: relativePath
                });
            }
        }
    });
}

scanFolder(baseDir);

fs.writeFileSync("data.json", JSON.stringify(result, null, 2));

console.log("✅ data.json generated successfully!");