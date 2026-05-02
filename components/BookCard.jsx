import Image from "next/image";
import Link from "next/link";
import { FiUser, FiBook } from "react-icons/fi";

const BADGE_CLASS = {
  Story:   "badge-secondary",
  Tech:    "badge-info",
  Science: "badge-accent",
};

export default function BookCard({ book }) {
  const qty        = book.available_quantity;
  const available  = qty > 0;

  return (
    <div className="card bg-base-200 border border-base-300 hover:border-primary/40 book-card-hover overflow-hidden h-full flex flex-col">
      {/* Cover */}
      <figure className="relative h-52 bg-base-300 shrink-0 overflow-hidden">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 300px"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-300/60 to-transparent" />
        <span
          className={`badge ${BADGE_CLASS[book.category] ?? "badge-neutral"} absolute top-3 left-3 shadow-lg`}
        >
          {book.category}
        </span>
        {!available && (
          <span className="badge badge-error absolute top-3 right-3 shadow-lg">
            Unavailable
          </span>
        )}
      </figure>

      {/* Body */}
      <div className="card-body p-4 flex flex-col flex-1">
        <h3 className="card-title text-sm font-semibold line-clamp-2 leading-snug flex-1">
          {book.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-base-content/55 mt-1">
          <FiUser className="text-primary shrink-0" />
          <span className="truncate">{book.author}</span>
        </div>

        <div
          className={`flex items-center gap-1.5 text-xs mt-0.5 ${
            available ? "text-success" : "text-error"
          }`}
        >
          <FiBook className="shrink-0" />
          <span>
            {available ? `${qty} cop${qty === 1 ? "y" : "ies"} available` : "Out of stock"}
          </span>
        </div>

        <div className="card-actions mt-3">
          <Link
            href={`/books/${book._id}`}
            className="btn btn-primary btn-sm w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
