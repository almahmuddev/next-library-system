"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";
import { authClient } from "@/lib/auth-client";
import { FiMail, FiBook, FiEdit3, FiCalendar, FiUser, FiExternalLink } from "react-icons/fi";

const BADGE_CLASS = {
  Story:   "badge-secondary",
  Tech:    "badge-info",
  Science: "badge-accent",
};

function ProfileContent() {
  const { data: session }       = authClient.useSession();
  const [borrows,  setBorrows]  = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    fetch("/api/borrow")
      .then((r) => r.json())
      .then((d) => { setBorrows(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const user = session?.user;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8">
        My Profile
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── User card ── */}
        <div className="lg:col-span-1">
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body items-center text-center p-8">

              {user?.image ? (
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                    {/* plain img — user-provided URLs may not be in next/image whitelist */}
                    <img
                      src={user.image}
                      alt={user.name || "user"}
                      className="w-24 h-24 object-cover"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                </div>
              ) : (
                <div className="avatar placeholder mb-4">
                  <div className="bg-primary text-primary-content rounded-full w-24">
                    <span className="text-3xl font-extrabold">
                      {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </span>
                  </div>
                </div>
              )}

              <h2 className="text-xl font-extrabold">{user?.name}</h2>
              <p className="text-xs text-base-content/40 uppercase tracking-widest mt-0.5">
                Member
              </p>

              <div className="w-full space-y-2 mt-4 text-left">
                <div className="flex items-center gap-2 text-sm text-base-content/60 p-2.5 bg-base-300/40 rounded-xl">
                  <FiMail className="text-primary shrink-0" />
                  <span className="truncate">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-base-content/60 p-2.5 bg-base-300/40 rounded-xl">
                  <FiBook className="text-primary shrink-0" />
                  <span>
                    {borrows.length} book{borrows.length !== 1 ? "s" : ""} borrowed
                  </span>
                </div>
              </div>

              <Link
                href="/profile/update"
                className="btn btn-primary btn-sm gap-2 mt-6 w-full shadow-lg shadow-primary/20"
              >
                <FiEdit3 className="text-xs" />
                Update Profile
              </Link>
            </div>
          </div>
        </div>

        {/* ── Borrowed books ── */}
        <div className="lg:col-span-2">
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FiBook className="text-primary" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg leading-tight">
                    Borrowed Books
                  </h3>
                  <p className="text-xs text-base-content/40">Your reading history</p>
                </div>
                <span className="badge badge-primary ml-auto">{borrows.length}</span>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-base-300/60 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : borrows.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">📚</div>
                  <p className="font-semibold mb-1">No books borrowed yet</p>
                  <p className="text-base-content/50 text-sm mb-4">
                    Head to the library and borrow your first book!
                  </p>
                  <Link href="/books" className="btn btn-primary btn-sm">
                    Browse Books
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {borrows.map((b) => (
                    <div
                      key={b._id}
                      className="flex items-center gap-4 p-4 bg-base-300/40 rounded-xl border border-base-300/50 hover:border-primary/25 transition-colors"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-10 h-14 shrink-0 rounded-lg overflow-hidden border border-base-300">
                        <Image
                          src={b.bookImage || "https://picsum.photos/seed/default/300/420"}
                          alt={b.bookTitle}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{b.bookTitle}</p>
                        <p className="text-xs text-base-content/55 truncate">
                          by {b.bookAuthor}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`badge badge-xs ${BADGE_CLASS[b.category] ?? "badge-neutral"}`}>
                            {b.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-base-content/40">
                            <FiCalendar className="text-[10px]" />
                            {new Date(b.borrowedAt).toLocaleDateString("en-US", {
                              year: "numeric", month: "short", day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Action */}
                      <Link
                        href={`/books/${b.bookId}`}
                        className="btn btn-ghost btn-xs text-primary gap-1"
                      >
                        View <FiExternalLink className="text-[10px]" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return <PrivateRoute><ProfileContent /></PrivateRoute>;
}
