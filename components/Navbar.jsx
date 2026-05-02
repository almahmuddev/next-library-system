"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";
import {
  FiBook, FiUser, FiLogOut, FiMenu, FiX,
  FiHome, FiBookOpen, FiGrid,
} from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";

const NAV_LINKS_PUBLIC = [
  { href: "/",      label: "Home",      Icon: FiHome     },
  { href: "/books", label: "All Books", Icon: FiBookOpen },
];

const NAV_LINKS_AUTH = [
  { href: "/",        label: "Home",       Icon: FiHome     },
  { href: "/books",   label: "All Books",  Icon: FiBookOpen },
  { href: "/profile", label: "My Profile", Icon: FiGrid     },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router   = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = session ? NAV_LINKS_AUTH : NAV_LINKS_PUBLIC;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
    setMenuOpen(false);
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 bg-base-200/80 backdrop-blur-md border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4 relative">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
            <FiBook className="text-primary-content text-sm" />
          </div>
          <span className="font-extrabold text-lg text-base-content hidden sm:block tracking-tight">
            Book<span className="text-primary">shelf</span>
          </span>
        </Link>

        {/* ── Desktop nav links (absolutely centered) ── */}
        <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/60 hover:text-base-content hover:bg-base-300"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Right side ── */}
        <div className="flex items-center gap-2">
          {/* Theme toggle — always visible */}
          <ThemeToggle />

          {isPending ? (
            <span className="loading loading-spinner loading-sm text-primary" />
          ) : session ? (
            <div className="hidden lg:flex items-center gap-2">
              {/* Avatar + name */}
              <Link href="/profile" className="flex items-center gap-2 group">
                {session.user.image ? (
                  <div className="avatar">
                    <div className="w-8 rounded-full ring-2 ring-primary/50 group-hover:ring-primary transition-all overflow-hidden">
                      <img
                        src={session.user.image}
                        alt={session.user.name || "user"}
                        className="w-8 h-8 object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-8">
                      <span className="text-xs font-bold">
                        {session.user.name?.[0]?.toUpperCase() ?? "U"}
                      </span>
                    </div>
                  </div>
                )}
                <span className="text-sm font-medium max-w-[120px] truncate">
                  {session.user.name}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-sm gap-1.5 text-base-content/60 hover:text-error"
              >
                <FiLogOut className="text-base" />
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/login"    className="btn btn-ghost btn-sm">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm gap-1">
                <FiUser className="text-xs" /> Register
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="btn btn-ghost btn-sm btn-square lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen
              ? <FiX className="text-xl" />
              : <FiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="lg:hidden border-t border-base-300 bg-base-200">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/70 hover:bg-base-300 hover:text-base-content"
                }`}
              >
                <Icon />
                {label}
              </Link>
            ))}

            <div className="border-t border-base-300 pt-2 mt-2">
              {session ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    {session.user.image ? (
                      <div className="avatar">
                        <div className="w-8 rounded-full overflow-hidden">
                          <img src={session.user.image} alt="" className="w-8 h-8 object-cover" />
                        </div>
                      </div>
                    ) : (
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-8">
                          <span className="text-xs font-bold">
                            {session.user.name?.[0]?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{session.user.name}</p>
                      <p className="text-xs text-base-content/50">{session.user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error/80 hover:bg-error/10 w-full"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-2 px-4 py-2">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="btn btn-ghost btn-sm flex-1"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="btn btn-primary btn-sm flex-1"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
