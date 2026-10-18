const fs = require('fs');
let content = fs.readFileSync('src/components/MobileMenu.tsx', 'utf-8');
content = content.replace(/const handleLinkClick = [\s\S]*?};\n\n/, '');
fs.writeFileSync('src/components/MobileMenu.tsx', content);
