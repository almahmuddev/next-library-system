import Link from "next/link";
import { FiArrowRight, FiSearch } from "react-icons/fi";

const STATS = [
  { n: "12+",    l: "Books"      },
  { n: "3",      l: "Categories" },
  { n: "Free",   l: "Borrowing"  },
  { n: "100%",   l: "Digital"    },
];

export default function Banner() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-base-100 via-base-200 to-base-100" />

      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">

        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Your Digital Library Is Open
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
          Find Your{" "}
          <span className="relative inline-block">
            <span className="text-primary">Next Read</span>
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/30 rounded-full" />
          </span>
        </h1>

        <p className="text-lg md:text-xl text-base-content/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Explore a curated collection of books across Story, Tech, and Science.
          Borrow digitally — no waiting, no late fees, just great reading.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/books" className="btn btn-primary btn-lg gap-2 px-10 shadow-lg shadow-primary/20">
            Browse Now
            <FiArrowRight />
          </Link>
          <Link
            href="/books"
            className="btn btn-outline btn-lg gap-2 border-base-300 hover:border-primary"
          >
            <FiSearch />
            Search Books
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
          {STATS.map(({ n, l }) => (
            <div
              key={l}
              className="bg-base-200/80 backdrop-blur border border-base-300 rounded-2xl py-4 px-3 text-center"
            >
              <div className="text-2xl font-extrabold text-primary">{n}</div>
              <div className="text-xs text-base-content/50 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
