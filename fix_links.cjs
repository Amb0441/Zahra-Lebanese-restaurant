const fs = require('fs');

function replaceLinks(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (filePath.includes('App.tsx')) {
    // We can change how Links are rendered
    content = content.replace(/link\.href\?\.startsWith\('\/'\).*?\? \(/, 'link.href ? (');
    
    // Instead of complex logic, use Link for all internal routes
    // For App.tsx desktop nav
    content = content.replace(
      /link\.href \? \(\n.*?link\.href\.startsWith\('\/'\) && !link\.href\.includes\('#'\) \? \([\s\S]*?\) :\s*\(\n\s*<a[\s\S]*?<\/a>\n\s*\)/,
      `link.href ? (
                  <Link
                    key={link.name} 
                    to={link.href} 
                    onClick={(e) => {
                      if (link.href.includes('#')) {
                        if (location.pathname === '/') {
                          e.preventDefault();
                          const id = link.href.split('#')[1];
                          const el = document.querySelector('#' + id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else {
                        window.scrollTo(0, 0);
                      }
                    }}
                    className={\`px-3.5 py-2 rounded-[4px] transition-all duration-150 \${headerSolid ? 'hover:text-neutral-900 hover:bg-neutral-100' : 'hover:text-white hover:bg-white/10'}\`}
                  >
                    {link.name}
                  </Link>
                )`
    );

    // For App.tsx footer nav
    content = content.replace(
      /l\.action \? \([\s\S]*?\) : \(\n\s*<a[\s\S]*?<\/a>\n\s*\)/g,
      `l.action ? (
                  <button
                    key={l.name}
                    onClick={l.action}
                    className="hover:text-white hover:underline transition-colors uppercase text-xs text-left"
                  >
                    {l.name}
                  </button>
                ) : l.href?.startsWith('http') ? (
                  <a
                    key={l.name}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline transition-colors uppercase text-xs"
                  >
                    {l.name}
                  </a>
                ) : (
                  <Link
                    key={l.name}
                    to={l.href!}
                    onClick={(e) => {
                      if (l.href?.includes('#') && location.pathname === '/') {
                        e.preventDefault();
                        const id = l.href.split('#')[1];
                        const el = document.querySelector('#' + id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      } else if (!l.href?.includes('#')) {
                        window.scrollTo(0, 0);
                      }
                    }}
                    className="hover:text-white hover:underline transition-colors uppercase text-xs"
                  >
                    {l.name}
                  </Link>
                )`
    );
  } else if (filePath.includes('MobileMenu.tsx')) {
    content = content.replace(
      /l\.action \? \([\s\S]*?\) : l\.href\?\.startsWith\('\/'\) && !l\.href\?\.includes\('#'\) \? \([\s\S]*?\) : \([\s\S]*?<\/a>\n\s*\)/,
      `l.action ? (
                  <button
                    key={l.name}
                    onClick={() => { onClose(); l.action(); }}
                    className="text-xs font-semibold tracking-[0.2em] text-neutral-200 hover:text-[#bd5e2d] transition-colors py-1.5 block uppercase w-full text-center"
                  >
                    {l.name}
                  </button>
                ) : l.href?.startsWith('http') ? (
                  <a
                    key={l.name}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold tracking-[0.2em] text-neutral-200 hover:text-[#bd5e2d] transition-colors py-1.5 block uppercase"
                  >
                    {l.name}
                  </a>
                ) : (
                  <Link
                    key={l.name}
                    to={l.href!}
                    onClick={(e) => {
                      if (l.href?.includes('#') && window.location.pathname === '/') {
                        e.preventDefault();
                        const id = l.href.split('#')[1];
                        const el = document.querySelector('#' + id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      } else if (!l.href?.includes('#')) {
                        window.scrollTo(0, 0);
                      }
                      onClose();
                    }}
                    className="text-xs font-semibold tracking-[0.2em] text-neutral-200 hover:text-[#bd5e2d] transition-colors py-1.5 block uppercase w-full text-center"
                  >
                    {l.name}
                  </Link>
                )`
    );
  }
  
  fs.writeFileSync(filePath, content);
}

replaceLinks('src/App.tsx');
replaceLinks('src/components/MobileMenu.tsx');
