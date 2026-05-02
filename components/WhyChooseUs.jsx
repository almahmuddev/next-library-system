import { FiShield, FiClock, FiBook, FiSmartphone, FiTrendingUp, FiAward } from "react-icons/fi";

const FEATURES = [
  {
    Icon: FiBook,
    title: "Vast Collection",
    desc: "Access books across Story, Tech, and Science with new titles added every month.",
    color: "text-primary",
    bg:    "bg-primary/10",
  },
  {
    Icon: FiClock,
    title: "Borrow Instantly",
    desc: "No waiting. Borrow any available book digitally and start reading right away.",
    color: "text-secondary",
    bg:    "bg-secondary/10",
  },
  {
    Icon: FiShield,
    title: "Secure & Private",
    desc: "Your reading history and personal data are protected with industry-grade security.",
    color: "text-accent",
    bg:    "bg-accent/10",
  },
  {
    Icon: FiSmartphone,
    title: "Read Anywhere",
    desc: "Access your borrowed books on any device — desktop, tablet, or smartphone.",
    color: "text-info",
    bg:    "bg-info/10",
  },
  {
    Icon: FiTrendingUp,
    title: "Track Progress",
    desc: "View your full borrowing history and rediscover books you loved in My Profile.",
    color: "text-warning",
    bg:    "bg-warning/10",
  },
  {
    Icon: FiAward,
    title: "Curated Quality",
    desc: "Every title in our collection is carefully selected for depth, quality, and impact.",
    color: "text-success",
    bg:    "bg-success/10",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-base-200/40">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-3">
            ✦ Why Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Why Choose Bookshelf?
          </h2>
          <p className="text-base-content/55 mt-2 text-sm max-w-sm mx-auto">
            We're more than a library — we're your reading companion
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="card bg-base-200 border border-base-300 hover:border-primary/30 p-6 book-card-hover"
            >
              <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-4`}>
                <Icon className={`text-xl ${color}`} />
              </div>
              <h3 className="font-bold text-base mb-1.5">{title}</h3>
              <p className="text-base-content/55 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
