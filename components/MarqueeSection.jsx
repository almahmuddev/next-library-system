const ITEMS = [
  { text: "New Arrival: The Midnight Library",                 icon: "📚" },
  { text: "Special Discount on Annual Memberships",            icon: "⚡" },
  { text: "New Arrival: Clean Code — Robert C. Martin",        icon: "📖" },
  { text: "Free Weekend Reads Every Saturday!",                icon: "🎉" },
  { text: "New Arrival: Cosmos by Carl Sagan",                 icon: "🌌" },
  { text: "Join 10,000+ Happy Readers Today",                  icon: "❤️" },
  { text: "New Arrival: The Alchemist",                        icon: "✨" },
  { text: "Unlimited Digital Borrowing — Start Now",           icon: "🔓" },
  { text: "New Arrival: Designing Data-Intensive Applications", icon: "💻" },
  { text: "Science Section Expanded — 4 New Titles",           icon: "🔬" },
];

export default function MarqueeSection() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="bg-primary/8 border-y border-primary/15 py-3 overflow-hidden select-none">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2.5 mx-8 text-sm text-base-content/70 whitespace-nowrap"
          >
            <span className="text-base leading-none">{item.icon}</span>
            <span>{item.text}</span>
            <span className="text-primary/40 mx-2">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
