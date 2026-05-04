# 📚 Bookshelf — Digital Library

> A seamless and modern web application that digitizes the traditional library experience.

## 🔗 Live URL

🚀 **[Live Demo](https://next-library-system-iota.vercel.app)**

## 📂 GitHub Repository

🔗 **[Source Code](https://github.com/almahmuddev/next-library-system)**

---

## 📸 Screenshots

### Home Page
![Home Page](https://next-library-system-iota.vercel.app/api/og)

### All Books
![All Books Page](https://via.placeholder.com/1200x600/0f172a/f59e0b?text=All+Books+Page)

### Book Detail
![Book Detail](https://via.placeholder.com/1200x600/0f172a/f59e0b?text=Book+Detail+Page)

### User Profile
![User Profile](https://via.placeholder.com/1200x600/0f172a/f59e0b?text=User+Profile)

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