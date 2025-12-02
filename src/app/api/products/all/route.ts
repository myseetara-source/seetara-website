import { NextResponse } from "next/server";
import { Product } from "@/types";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "src/data/products.json");

async function getProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Get all products including inactive ones (for admin)
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ success: true, data: products });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

