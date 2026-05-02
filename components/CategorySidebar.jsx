const CATS = [
  { label: "All Books", emoji: "📚", value: ""        },
  { label: "Story",     emoji: "📖", value: "Story"   },
  { label: "Tech",      emoji: "💻", value: "Tech"    },
  { label: "Science",   emoji: "🔬", value: "Science" },
];

const ACTIVE_CLASS = {
  "":       "bg-primary/15 text-primary border-primary/30",
  Story:    "bg-secondary/15 text-secondary border-secondary/30",
  Tech:     "bg-info/15 text-info border-info/30",
  Science:  "bg-accent/15 text-accent border-accent/30",
};

export default function CategorySidebar({ selected, onSelect }) {
  return (
    <aside className="w-full lg:w-56 shrink-0">
      <div className="card bg-base-200 border border-base-300 p-4 sticky top-20">
        <h3 className="font-semibold text-sm uppercase tracking-widest text-base-content/60 mb-4 px-1">
          Categories
        </h3>
        <ul className="flex flex-row lg:flex-col gap-2 flex-wrap">
          {CATS.map((c) => {
            const isActive = selected === c.value;
            return (
              <li key={c.value} className="w-auto lg:w-full">
                <button
                  onClick={() => onSelect(c.value)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left border transition-all ${
                    isActive
                      ? `${ACTIVE_CLASS[c.value]} border`
                      : "border-transparent text-base-content/60 hover:bg-base-300 hover:text-base-content"
                  }`}
                >
                  <span className="text-base leading-none">{c.emoji}</span>
                  {c.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
