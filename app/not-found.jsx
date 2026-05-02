import Link from "next/link";
import { FiArrowLeft, FiBook } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">📭</div>
        <h1 className="text-6xl font-extrabold text-primary mb-2">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-base-content/55 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-primary gap-2">
            <FiArrowLeft /> Go Home
          </Link>
          <Link href="/books" className="btn btn-ghost border border-base-300 gap-2">
            <FiBook /> Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
}
