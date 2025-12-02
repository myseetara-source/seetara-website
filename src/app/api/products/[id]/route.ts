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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const products = await getProducts();
    const product = products.find((p) => p.id === id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: product });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const products = await getProducts();
    const index = products.findIndex((p) => p.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }
    
    products[index] = {
      ...products[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await saveProducts(products);
    
    return NextResponse.json({ success: true, data: products[index] });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const products = await getProducts();
    const filteredProducts = products.filter((p) => p.id !== id);
    
    if (products.length === filteredProducts.length) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }
    
    await saveProducts(filteredProducts);
    
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

