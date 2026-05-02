import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search   = searchParams.get("search")   || "";
    const category = searchParams.get("category") || "";
    const limit    = parseInt(searchParams.get("limit") || "0");

    const db    = await getDb();
    const query = {};

    if (search)   query.title    = { $regex: search, $options: "i" };
    if (category) query.category = category;

    let cursor = db.collection("books").find(query);
    if (limit > 0) cursor = cursor.limit(limit);

    const books = await cursor.toArray();
    return NextResponse.json(
      books.map((b) => ({ ...b, _id: b._id.toString() }))
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
