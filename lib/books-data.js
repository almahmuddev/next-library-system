const booksData = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived — to find out what would have happened if you had made other choices. Would you have done anything different, if you had the chance to undo your regrets?",
    category: "Story",
    available_quantity: 5,
    image_url: "https://picsum.photos/seed/midnight/300/420",
  },
  {
    id: "2",
    title: "The Shadow of the Wind",
    author: "Carlos Ruiz Zafón",
    description:
      "A young boy discovers a mysterious book in Barcelona's Cemetery of Forgotten Books, leading him on an unforgettable adventure through the city's labyrinthine past and the dark secrets hidden within its ancient walls. A sweeping tale of love, loss, and the enduring power of literature.",
    category: "Story",
    available_quantity: 3,
    image_url: "https://picsum.photos/seed/shadow/300/420",
  },
  {
    id: "3",
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A shepherd boy named Santiago embarks on a journey from Spain to Egypt in search of treasure, discovering along the way that the real treasure lies within himself and in following one's personal legend. A timeless allegory about following your dreams and listening to your heart.",
    category: "Story",
    available_quantity: 8,
    image_url: "https://picsum.photos/seed/alchemist/300/420",
  },
  {
    id: "4",
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    description:
      "The multi-generational story of the Buendía family and the mythical town of Macondo. A masterpiece of magical realism that chronicles love, war, and the inevitable march of time through a century of extraordinary and surreal events that blur the line between reality and fantasy.",
    category: "Story",
    available_quantity: 2,
    image_url: "https://picsum.photos/seed/solitude/300/420",
  },
  {
    id: "5",
    title: "Clean Code",
    author: "Robert C. Martin",
    description:
      "A handbook of agile software craftsmanship that teaches programmers how to write clean, readable, and maintainable code. Robert C. Martin lays out best practices with clear examples and refactoring exercises. Essential reading for every developer who wants to produce professional-quality software.",
    category: "Tech",
    available_quantity: 6,
    image_url: "https://picsum.photos/seed/cleancode/300/420",
  },
  {
    id: "6",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    description:
      "This classic guide teaches you to think about your programming career differently with practical tips, anecdotes, and thought-provoking examples. It helps you become a better software developer through timeless advice on topics ranging from personal responsibility to architectural techniques.",
    category: "Tech",
    available_quantity: 4,
    image_url: "https://picsum.photos/seed/pragmatic/300/420",
  },
  {
    id: "7",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    description:
      "A deep dive into the core mechanisms of JavaScript, covering scopes, closures, the 'this' keyword, objects, prototypes, types, and grammar with brutal honesty about the language's quirks. This series challenges common misconceptions and gives developers a truly deep understanding of JS.",
    category: "Tech",
    available_quantity: 7,
    image_url: "https://picsum.photos/seed/javascript/300/420",
  },
  {
    id: "8",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    description:
      "An in-depth guide to the principles, practices, and tools for building reliable, scalable, and maintainable data systems. Covers databases, caching, stream processing, and distributed systems with clarity and depth that makes complex concepts accessible to practicing engineers.",
    category: "Tech",
    available_quantity: 3,
    image_url: "https://picsum.photos/seed/dataapps/300/420",
  },
  {
    id: "9",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    description:
      "From the Big Bang to black holes, Stephen Hawking explores the nature of space and time, the role of God in creation, and the future and past of the universe. Written for the non-specialist, this book remains one of the most accessible and profound scientific works ever published.",
    category: "Science",
    available_quantity: 5,
    image_url: "https://picsum.photos/seed/briefhistory/300/420",
  },
  {
    id: "10",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    description:
      "A revolutionary work that introduced the gene-centered view of evolution and the concept of the meme, forever changing how scientists and readers understand natural selection and biological life. Dawkins argues compellingly that genes are the true units of selection in the evolutionary process.",
    category: "Science",
    available_quantity: 4,
    image_url: "https://picsum.photos/seed/selfishgene/300/420",
  },
  {
    id: "11",
    title: "Cosmos",
    author: "Carl Sagan",
    description:
      "A personal voyage through the universe's 15-billion-year history and humanity's place within it. Carl Sagan combines rigorous science, philosophy, and poetic wonder in this beloved classic that has inspired millions to look up at the stars and wonder about our place in the cosmos.",
    category: "Science",
    available_quantity: 6,
    image_url: "https://picsum.photos/seed/cosmos/300/420",
  },
  {
    id: "12",
    title: "The Gene: An Intimate History",
    author: "Siddhartha Mukherjee",
    description:
      "An epic history of the gene from Gregor Mendel to CRISPR, exploring how this fundamental unit of heredity defines who we are. Mukherjee weaves personal narrative with historical and scientific insight, raising profound questions about identity, disease, and the future of human genetics.",
    category: "Science",
    available_quantity: 2,
    image_url: "https://picsum.photos/seed/gene/300/420",
  },
  {
    id: "13",
    title: "The Book Thief",
    author: "Markus Zusak",
    description:
      "Set during World War II, a young girl discovers the power of books and storytelling while living in Nazi Germany.",
    category: "Story",
    available_quantity: 5,
    image_url: "https://covers.openlibrary.org/b/isbn/9780375842207-L.jpg",
  },
  {
    id: "14",
    title: "Refactoring",
    author: "Martin Fowler",
    description:
      "A classic guide to improving the design of existing code without changing its behavior.",
    category: "Tech",
    available_quantity: 4,
    image_url: "https://covers.openlibrary.org/b/isbn/9780134757599-L.jpg",
  },
  {
    id: "15",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description:
      "An exploration of how Homo sapiens came to dominate the world through culture, cooperation, and innovation.",
    category: "Science",
    available_quantity: 6,
    image_url: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
  },
];

export default booksData;
