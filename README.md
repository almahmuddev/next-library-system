# 📚 Bookshelf — Digital Library

> A seamless and modern web application that digitizes the traditional library experience.

![Bookshelf Preview](https://picsum.photos/seed/bookshelf-hero/1200/400)

## 🔗 Live URL

[https://bookshelf-digital-library.vercel.app](https://bookshelf-digital-library.vercel.app)

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔐 Secure Auth | Email/password & Google OAuth via BetterAuth |
| 📚 12-Book Collection | Story, Tech, and Science categories |
| 🔍 Real-time Search | Search books by title with debounced input |
| 🗂️ Category Filtering | Sidebar filter on All Books page |
| 📖 Digital Borrowing | Borrow with live availability tracking |
| 👤 User Profile | Full borrow history with timestamps |
| ✏️ Update Profile | Change name & photo URL (BetterAuth updateUser) |
| 🎠 Swiper Carousel | Featured books carousel with autoplay |
| 🌗 Theme Toggle | Switch between Midnight Amber (dark) and Warm Ivory (light) |
| 📱 Fully Responsive | Mobile, tablet, and desktop layouts |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** (App Router) | Full-stack framework |
| **Tailwind CSS** | Utility-first styling |
| **DaisyUI** | Component library with custom themes |
| **BetterAuth** | Authentication engine |
| **MongoDB** | Database (via official driver) |
| **Swiper.js** | Book carousel animation (required) |
| **React Hot Toast** | Toast notifications |
| **React Icons** | Icon set |

---

## 📦 NPM Packages

```json
"better-auth":      "^1.0.0",
"mongodb":          "^6.3.0",
"next":             "14.2.3",
"react-hot-toast":  "^2.4.1",
"react-icons":      "^5.1.0",
"swiper":           "^11.1.1"
```

---

### 2 · Configure `.env.local`

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookshelf
BETTER_AUTH_SECRET=your-super-secret-key-minimum-32-characters-long
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3 · Seed the Database (one-time)

Start the dev server, then visit in your browser:

```
http://localhost:3000/api/seed
```

You should see: `✅ Successfully seeded 12 books into the database!`

### 4 · Run

```bash
npm run dev      # development server → http://localhost:3000
npm run build    # production build
npm start        # production server
```

---

## 🗂️ Project Structure

```
bookshelf/
├── app/
│   ├── (auth)/
│   │   ├── login/page.jsx       ← Login page
│   │   └── register/page.jsx    ← Register page
│   ├── books/
│   │   ├── page.jsx             ← All Books (search + category filter)
│   │   └── [id]/page.jsx        ← Book Detail (PRIVATE)
│   ├── profile/
│   │   ├── page.jsx             ← My Profile (PRIVATE)
│   │   └── update/page.jsx      ← Update Profile (PRIVATE)
│   ├── api/
│   │   ├── auth/[...all]/       ← BetterAuth handler
│   │   ├── books/               ← GET all books (search + filter)
│   │   ├── books/[id]/          ← GET single book
│   │   ├── borrow/              ← POST borrow + GET user borrows
│   │   └── seed/                ← One-time DB seeder
│   ├── layout.jsx               ← Root layout
│   ├── page.jsx                 ← Home page
│   ├── not-found.jsx            ← 404 page
│   └── globals.css
├── components/
│   ├── Navbar.jsx               ← Sticky navbar with auth state
│   ├── Footer.jsx               ← Footer with links + contacts
│   ├── ThemeToggle.jsx          ← 🌗 Dark/Light toggle button
│   ├── BookCard.jsx             ← Reusable book card
│   ├── FeaturedBooks.jsx        ← Swiper.js carousel
│   ├── Banner.jsx               ← Hero section
│   ├── MarqueeSection.jsx       ← Scrolling ticker
│   ├── WhyChooseUs.jsx          ← Features grid
│   ├── ExploreCategories.jsx    ← Category cards
│   ├── CategorySidebar.jsx      ← Filter sidebar
│   └── PrivateRoute.jsx         ← Auth guard wrapper
├── lib/
│   ├── mongodb.js               ← DB connection (singleton)
│   ├── auth.js                  ← BetterAuth server config
│   ├── auth-client.js           ← BetterAuth client
│   ├── theme.js                 ← Theme context & hook
│   └── books-data.js            ← 12-book seed data
├── .env.local.example
├── next.config.mjs
├── tailwind.config.js
└── README.md
```

---

## 🗄️ Database Schema (MongoDB)

### books
```js
{
  _id: ObjectId,
  title: String,
  author: String,
  description: String,
  category: "Story" | "Tech" | "Science",
  available_quantity: Number,
  image_url: String
}
```

### borrows
```js
{
  _id: ObjectId,
  userId: String,         // BetterAuth user ID
  bookId: String,
  bookTitle: String,
  bookImage: String,
  bookAuthor: String,
  category: String,
  borrowedAt: Date
}
```

*(Users collection is managed automatically by BetterAuth)*

---

## 🌗 Themes

| Theme | Style |
|-------|-------|
| **Midnight Amber** (dark) | Deep slate (`#0f172a`) + Amber gold (`#f59e0b`) |
| **Warm Ivory** (light) | Cream (`#fefce8`) + Amber (`#d97706`) |

Toggle with the 🌙/☀️ button in the navbar.

---

## 🌐 Deployment (Vercel)

1. Push repo to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.local.example`
4. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your production domain
5. Deploy — all routes handle page reloads correctly ✅

---

## 📋 Suggested Git Commits

```bash
git commit -m "init: project setup, tailwind, daisyui config"
git commit -m "feat: mongodb connection and BetterAuth setup"
git commit -m "feat: root layout, navbar with theme toggle, footer"
git commit -m "feat: theme system - dark midnight amber + light warm ivory"
git commit -m "feat: home page - banner, marquee, why-us, categories"
git commit -m "feat: seed 12 books and books API routes"
git commit -m "feat: all books page with search and category filter sidebar"
git commit -m "feat: login and register pages with Google OAuth"
git commit -m "feat: book detail private route with borrow logic"
git commit -m "feat: my profile and update profile private routes"
```
