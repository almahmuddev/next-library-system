import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("search")   || "";
    const category   = searchParams.get("category") || "";
    const limit      = parseInt(searchParams.get("limit") || "0");

    const database = await getDb();
    const query = {};

    if (searchTerm) query.title    = { $regex: searchTerm, $options: "i" };
    if (category)   query.category = category;

    let cursor = database.collection("books").find(query);
    if (limit > 0) cursor = cursor.limit(limit);

    const books = await cursor.toArray();
    return NextResponse.json(
      books.map((book) => ({ ...book, _id: book._id.toString() }))
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
