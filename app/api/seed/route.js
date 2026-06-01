import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import booksData from "@/lib/books-data";

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("books");

    const existing = await collection.countDocuments();
    if (existing > 0) {
      return NextResponse.json({
        message: `Database already seeded with ${existing} books. No action taken.`,
        count: existing,
      });
    }

    const result = await collection.insertMany(booksData);
    return NextResponse.json({
      message: `✅ Successfully seeded ${result.insertedCount} books into the database!`,
      count: result.insertedCount,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

