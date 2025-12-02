import { NextRequest, NextResponse } from "next/server";
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

async function saveProducts(products: Product[]): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
}

export async function GET() {
  try {
    const products = await getProducts();
    const activeProducts = products.filter((p) => p.isActive);
    return NextResponse.json({ success: true, data: activeProducts });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const products = await getProducts();
    
    const newProduct: Product = {
      id: Date.now().toString(),
      name: body.name,
      price: body.price,
      originalPrice: body.originalPrice,
      description: body.description,
      image: body.image,
      hoverImage: body.hoverImage,
      category: body.category,
      colors: body.colors || [],
      rating: body.rating || 5.0,
      reviews: body.reviews || 0,
      badge: body.badge,
      stock: body.stock || 0,
      isActive: body.isActive ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    products.push(newProduct);
    await saveProducts(products);
    
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}

