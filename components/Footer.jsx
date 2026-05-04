import Link from "next/link";
import {
  FiBook, FiFacebook, FiLinkedin,
  FiInstagram, FiGithub, FiMail,
  FiPhone, FiMapPin, FiHeart,
} from "react-icons/fi";

const SOCIAL = [
  { Icon: FiFacebook,  href: "https://www.facebook.com/share/1AKXLBv3Gv", label: "Facebook", target: "_blank"  },
  { Icon: FiLinkedin,  href: "https://www.linkedin.com/in/almahmuddev/", label: "LinkedIn", target: "_blank"  },
  { Icon: FiInstagram, href: "https://www.instagram.com/almahmuddev/", label: "Instagram", target: "_blank" },
  { Icon: FiGithub,    href: "https://github.com/almahmuddev", label: "GitHub", target: "_blank"    },
];

const QUICK_LINKS = [
  { href: "/",                    label: "Home"           },
  { href: "/books",               label: "All Books"      },
  { href: "/books?category=Story",label: "Story Books"    },
  { href: "/books?category=Tech", label: "Tech Books"     },
  { href: "/books?category=Science",label:"Science Books" },
  { href: "/profile",             label: "My Profile"     },
];

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* ── Brand ── */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <FiBook className="text-primary-content" />
              </div>
              <span className="font-extrabold text-xl text-base-content tracking-tight">
                Book<span className="text-primary">shelf</span>
              </span>
            </Link>
            <p className="text-base-content/55 text-sm leading-relaxed">
              Your digital gateway to knowledge. Explore hundreds of books,
              borrow digitally, and expand your world — all in one place.
            </p>
            <div className="flex gap-1 mt-6">
              {SOCIAL.map(({ Icon, href, label, target }) => (
                <a
                  key={label}
                  href={href}
                  target={target}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="btn btn-ghost btn-sm btn-square text-base-content/40 hover:text-primary"
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="font-semibold text-base-content mb-5 text-sm uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-base-content/55 hover:text-primary text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="text-primary/50">›</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h3 className="font-semibold text-base-content mb-5 text-sm uppercase tracking-widest">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-base-content/55">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FiMail className="text-primary text-sm" />
                </div>
                <a href="mailto:devalmahmud@gmail.com" className="hover:text-primary transition-colors">
                  devalmahmud@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-base-content/55">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FiPhone className="text-primary text-sm" />
                </div>
                <a href="tel:+8801874991984" className="hover:text-primary transition-colors">
                  +88 01874991984
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-base-content/55">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <FiMapPin className="text-primary text-sm" />
                </div>
                Sylhet, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-base-300 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-base-content/40">
            © {new Date().getFullYear()} Bookshelf Digital Library. All rights reserved.
          </p>
          <p className="text-sm text-base-content/40 flex items-center gap-1">
            Made with <FiHeart className="text-primary" /> by Mahmud Khan
          </p>
        </div>
      </div>
    </footer>
  );
}
