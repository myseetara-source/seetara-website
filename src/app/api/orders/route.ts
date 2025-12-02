import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/types";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "src/data/orders.json");

async function getOrders(): Promise<Order[]> {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveOrders(orders: Order[]): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(orders, null, 2));
}

function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `ST${year}${month}${day}${random}`;
}

export async function GET() {
  try {
    const orders = await getOrders();
    // Sort by created date descending
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return NextResponse.json({ success: true, data: orders });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orders = await getOrders();
    
    const subtotal = body.items.reduce(
      (sum: number, item: { product: { price: number }; quantity: number }) => 
        sum + item.product.price * item.quantity,
      0
    );
    
    const shippingCost = subtotal >= 3000 ? 0 : 150;
    
    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber: generateOrderNumber(),
      items: body.items,
      address: body.address,
      paymentMethod: body.paymentMethod || "cod",
      status: "pending",
      subtotal,
      shippingCost,
      total: subtotal + shippingCost,
      notes: body.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    orders.push(newOrder);
    await saveOrders(orders);
    
    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}

