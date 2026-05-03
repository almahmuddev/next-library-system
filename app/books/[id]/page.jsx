"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import PrivateRoute from "@/components/PrivateRoute";
import toast from "react-hot-toast";
import {
  FiArrowLeft, FiUser, FiBookOpen, FiBook,
  FiCheckCircle, FiAlertCircle,
} from "react-icons/fi";

const BADGE_CLASS = {
  Story:   "bg-secondary/20 text-secondary",
  Tech:    "bg-info/20 text-info",
  Science: "bg-accent/20 text-accent",
};

function BookDetailContent() {
  const { id }              = useParams();
  const router              = useRouter();
  const { data: session }   = authClient.useSession();
  const [book, setBook]     = useState(null);
  const [loading, setLoading]   = useState(true);
  const [borrowing, setBorrowing] = useState(false);
  const [borrowed, setBorrowed]   = useState(false);

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then((r) => r.json())
      .then((d) => { setBook(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleBorrow = async () => {
    if (!session) { router.push("/login"); return; }
    setBorrowing(true);
    try {
      const res  = await fetch("/api/borrow", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ bookId: id }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to borrow book");
      } else {
        toast.success("📚 Book borrowed successfully!");
        setBorrowed(true);
        setBook((prev) => ({
          ...prev,
          available_quantity: prev.available_quantity - 1,
        }));
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setBorrowing(false);
    }
  };

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-8 w-32 bg-base-200 rounded-xl mb-8" />
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-64 h-96 bg-base-200 rounded-2xl" />
          <div className="flex-1 space-y-4">
            <div className="h-9 bg-base-200 rounded w-3/4" />
            <div className="h-4 bg-base-200 rounded w-1/3" />
            <div className="h-32 bg-base-200 rounded mt-4" />
            <div className="h-12 bg-base-200 rounded w-40 mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!book || book.error) {
    return (
      <div className="text-center py-24">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-xl font-bold mb-2">Book not found</p>
        <Link href="/books" className="btn btn-primary mt-4">
          Back to Books
        </Link>
      </div>
    );
  }

  const available = book.available_quantity > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Back button */}
      <Link
        href="/books"
        className="inline-flex items-center gap-2 text-sm text-base-content/50 hover:text-primary mb-8 transition-colors"
      >
        <FiArrowLeft /> Back to Books
      </Link>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-16">

        {/* ── Cover ── */}
        <div className="w-full md:w-64 shrink-0">
          <div className="relative h-96 rounded-2xl overflow-hidden border border-base-300 shadow-2xl shadow-base-300/50">
            <Image
              src={book.image_url}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 256px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-300/40 to-transparent" />
          </div>

          {/* Quick meta under cover */}
          <div className="mt-4 card bg-base-200 border border-base-300 p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <FiUser className="text-primary shrink-0" />
              <span className="text-base-content/70">{book.author}</span>
            </div>
            <div className={`flex items-center gap-2 text-sm ${available ? "text-success" : "text-error"}`}>
              {available
                ? <FiCheckCircle className="shrink-0" />
                : <FiAlertCircle className="shrink-0" />
              }
              <span>
                {available
                  ? `${book.available_quantity} cop${book.available_quantity === 1 ? "y" : "ies"} left`
                  : "Out of stock"
                }
              </span>
            </div>
          </div>
        </div>

        {/* ── Details ── */}
        <div className="flex-1">

          {/* Category badge */}
          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${BADGE_CLASS[book.category] ?? "bg-base-300 text-base-content"} mb-4`}>
            {book.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-3">
            {book.title}
          </h1>

          <div className="flex items-center gap-2 text-base-content/60 mb-6">
            <FiUser className="text-primary" />
            <span className="text-lg">by <em>{book.author}</em></span>
          </div>

          <div className="divider" />

          <h2 className="font-semibold mb-3 text-sm uppercase tracking-widest text-base-content/50">
            About this Book
          </h2>
          <p className="text-base-content/75 leading-relaxed">
            {book.description}
          </p>

          <div className="divider" />

          {/* Borrow section */}
          {borrowed ? (
            <div className="alert alert-success">
              <FiCheckCircle className="text-xl" />
              <div>
                <div className="font-bold">Successfully Borrowed!</div>
                <div className="text-sm">Check your{" "}
                  <Link href="/profile" className="underline">profile</Link>
                  {" "}to see your borrowed books.
                </div>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={handleBorrow}
                disabled={borrowing || !available}
                className={`btn btn-lg gap-2 w-full sm:w-auto ${
                  available ? "btn-primary shadow-lg shadow-primary/20" : "btn-disabled"
                }`}
              >
                {borrowing
                  ? <span className="loading loading-spinner loading-sm" />
                  : <FiBook />
                }
                {!available ? "Out of Stock" : "Borrow This Book"}
              </button>

              {!session && available && (
                <p className="text-sm text-base-content/40 mt-2">
                  * You'll be redirected to login to borrow
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookDetailPage() {
  return (
    <PrivateRoute>
      <BookDetailContent />
    </PrivateRoute>
  );
}
