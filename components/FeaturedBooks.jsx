"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BookCard from "./BookCard";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function FeaturedBooks() {
  const [books,   setBooks]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books?limit=4")
      .then((r) => r.json())
      .then((d) => { setBooks(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-3">
              ✦ Featured
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Top Picks for You
            </h2>
            <p className="text-base-content/55 mt-2 text-sm">
              Handpicked titles loved by our reading community
            </p>
          </div>
          <Link
            href="/books"
            className="btn btn-ghost btn-sm gap-1 text-primary hidden sm:flex"
          >
            View All <FiArrowRight />
          </Link>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="card bg-base-200 border border-base-300 h-80 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            breakpoints={{
              0:    { slidesPerView: 1.2 },
              480:  { slidesPerView: 2   },
              768:  { slidesPerView: 3   },
              1280: { slidesPerView: 4   },
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation
            autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
            className="pb-12 !overflow-visible"
          >
            {books.map((book) => (
              <SwiperSlide key={book._id} className="h-auto">
                <BookCard book={book} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="text-center mt-2 sm:hidden">
          <Link href="/books" className="btn btn-primary btn-sm gap-1">
            View All Books <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
