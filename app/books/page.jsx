"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BookCard from "@/components/BookCard";
import CategorySidebar from "@/components/CategorySidebar";
import { FiSearch, FiX } from "react-icons/fi";

function BooksContent() {
  const searchParams = useSearchParams();
  const [books,    setBooks]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState(() => searchParams.get("category") || "");

  // Sync category when URL search params change (back/forward navigation)
  useEffect(() => {
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  // Fetch with debounce
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search)   params.set("search",   search);
    if (category) params.set("category", category);

    const debounceTimer = setTimeout(() => {
      fetch(`/api/books?${params}`)
        .then((response) => response.json())
        .then((data) => { 
          setBooks(Array.isArray(data) ? data : []); 
          setLoading(false); 
        })
        .catch(() => setLoading(false));
    }, 280);

    return () => clearTimeout(debounceTimer);
  }, [search, category]);

  const clearFilters = () => { setSearch(""); setCategory(""); };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">
          All Books
        </h1>
        <p className="text-base-content/55 text-sm">
          {loading
            ? "Searching…"
            : `${books.length} book${books.length !== 1 ? "s" : ""} found${category ? ` in ${category}` : ""}${search ? ` matching "${search}"` : ""}`
          }
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-8">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-lg pointer-events-none" />
        <input
          type="text"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full pl-12 pr-10 bg-base-200 border-base-300 focus:border-primary h-12 text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
          >
            <FiX />
          </button>
        )}
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        <CategorySidebar selected={category} onSelect={setCategory} />

        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="card bg-base-200 border border-base-300 h-80 animate-pulse" />
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold mb-2">No books found</h3>
              <p className="text-base-content/55 text-sm mb-5">
                Try a different search term or category
              </p>
              <button onClick={clearFilters} className="btn btn-primary btn-sm gap-2">
                <FiX /> Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card bg-base-200 border border-base-300 h-80 animate-pulse" />
          ))}
        </div>
      </div>
    }>
      <BooksContent />
    </Suspense>
  );
}
