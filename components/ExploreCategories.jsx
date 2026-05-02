import Link from "next/link";

const CATS = [
  {
    name:     "Story",
    emoji:    "📖",
    count:    4,
    desc:     "Fiction, novels, and timeless tales that transport you to other worlds and ignite your imagination.",
    gradient: "from-purple-600/15 via-secondary/8 to-transparent",
    border:   "hover:border-secondary/50",
    badge:    "bg-secondary/15 text-secondary",
    textColor:"text-secondary",
  },
  {
    name:     "Tech",
    emoji:    "💻",
    count:    4,
    desc:     "Programming, system design, and engineering books that level up your technical skills.",
    gradient: "from-sky-600/15 via-info/8 to-transparent",
    border:   "hover:border-info/50",
    badge:    "bg-info/15 text-info",
    textColor:"text-info",
  },
  {
    name:     "Science",
    emoji:    "🔬",
    count:    4,
    desc:     "Explore the universe, biology, physics, and the wonders of our natural world.",
    gradient: "from-emerald-600/15 via-accent/8 to-transparent",
    border:   "hover:border-accent/50",
    badge:    "bg-accent/15 text-accent",
    textColor:"text-accent",
  },
];

export default function ExploreCategories() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-3">
            ✦ Explore
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Browse by Category
          </h2>
          <p className="text-base-content/55 mt-2 text-sm">
            Find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATS.map((c) => (
            <Link
              key={c.name}
              href={`/books?category=${c.name}`}
              className={`card bg-gradient-to-br ${c.gradient} border border-base-300 ${c.border} book-card-hover group overflow-hidden`}
            >
              <div className="card-body p-8 text-center relative">
                {/* Big emoji */}
                <div className="text-6xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  {c.emoji}
                </div>

                {/* Count badge */}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${c.badge} mb-3 mx-auto`}>
                  {c.count} Books
                </span>

                <h3 className="text-xl font-extrabold mb-2 tracking-tight">{c.name}</h3>
                <p className="text-base-content/55 text-sm leading-relaxed mb-5">
                  {c.desc}
                </p>

                <span className={`text-sm font-semibold ${c.textColor} group-hover:underline underline-offset-2`}>
                  Explore {c.name} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
