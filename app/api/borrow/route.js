import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookId } = await request.json();

    if (!bookId || !ObjectId.isValid(bookId)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }

    const db   = await getDb();
    const book = await db
      .collection("books")
      .findOne({ _id: new ObjectId(bookId) });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    if (book.available_quantity <= 0) {
      return NextResponse.json(
        { error: "This book is currently unavailable" },
        { status: 400 }
      );
    }

    const alreadyBorrowed = await db
      .collection("borrows")
      .findOne({ userId: session.user.id, bookId });

    if (alreadyBorrowed) {
      return NextResponse.json(
        { error: "You have already borrowed this book" },
        { status: 400 }
      );
    }

    await db
      .collection("books")
      .updateOne(
        { _id: new ObjectId(bookId) },
        { $inc: { available_quantity: -1 } }
      );

    await db.collection("borrows").insertOne({
      userId:     session.user.id,
      bookId,
      bookTitle:  book.title,
      bookImage:  book.image_url,
      bookAuthor: book.author,
      category:   book.category,
      borrowedAt: new Date(),
    });

    return NextResponse.json({ message: "Book borrowed successfully!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db      = await getDb();
    const borrows = await db
      .collection("borrows")
      .find({ userId: session.user.id })
      .sort({ borrowedAt: -1 })
      .toArray();

    return NextResponse.json(
      borrows.map((b) => ({ ...b, _id: b._id.toString() }))
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
