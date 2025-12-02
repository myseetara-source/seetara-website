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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orders = await getOrders();
    const order = orders.find((o) => o.id === id || o.orderNumber === id);
    
    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: order });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch order" },
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
    const orders = await getOrders();
    const index = orders.findIndex((o) => o.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }
    
    orders[index] = {
      ...orders[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await saveOrders(orders);
    
    return NextResponse.json({ success: true, data: orders[index] });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
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
    const orders = await getOrders();
    const filteredOrders = orders.filter((o) => o.id !== id);
    
    if (orders.length === filteredOrders.length) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }
    
    await saveOrders(filteredOrders);
    
    return NextResponse.json({ success: true, message: "Order deleted" });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete order" },
      { status: 500 }
    );
  }
}

