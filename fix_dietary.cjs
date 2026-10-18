const fs = require('fs');
let content = fs.readFileSync('src/components/MenuSection.tsx', 'utf-8');

const oldStr = `{selectedItem.dietary && selectedItem.dietary.length > 0 && (
                  <div className="flex gap-2 flex-wrap mb-4">
                    {selectedItem.dietary.map(d => (
                      <span key={d} className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold tracking-widest uppercase">
                        {d}
                      </span>
                    ))}
                  </div>
                )}`;

const newStr = `                <div className="flex gap-2 flex-wrap mb-4">
                  {!['beverages', 'shisha'].includes(selectedItem.category) && (
                    <span className="inline-flex items-center px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 rounded text-[10px] font-bold tracking-widest uppercase">
                      Halal
                    </span>
                  )}
                  {selectedItem.dietary?.map(d => {
                    const label = d === 'V' ? 'Vegetarian' : d === 'VG' ? 'Vegan' : d === 'GF' ? 'Gluten-Free' : d;
                    return (
                      <span key={d} className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded text-[10px] font-bold tracking-widest uppercase">
                        {label}
                      </span>
                    );
                  })}
                </div>`;

content = content.replace(oldStr, newStr);

fs.writeFileSync('src/components/MenuSection.tsx', content);
