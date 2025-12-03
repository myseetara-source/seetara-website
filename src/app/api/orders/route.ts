import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { CartItem, OrderAddress, PaymentMethod } from "@/types";

interface OrderRequestBody {
  items: CartItem[];
  address: OrderAddress;
  paymentMethod: PaymentMethod;
  notes?: string;
}

function generateOrderId(): string {
  // Generate order ID similar to ERP format
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `WEB${timestamp}${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderRequestBody = await request.json();
    const { items, address, paymentMethod, notes } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "No items in cart" },
        { status: 400 }
      );
    }

    if (!address || !address.fullName || !address.phone || !address.address) {
      return NextResponse.json(
        { success: false, error: "Invalid address information" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Calculate totals
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const shippingCost = subtotal >= 3000 ? 0 : 150;
    const total = subtotal + shippingCost;

    // Format product description for the ERP
    const productDescription = items
      .map((item) => `${item.product.name} x${item.quantity}`)
      .join(", ");

    // Format full address
    const fullAddress = [
      address.address,
      address.city,
      address.district,
      address.landmark,
    ]
      .filter(Boolean)
      .join(", ");

    // Determine valley based on district (simplified logic)
    const insideValleyDistricts = ["Kathmandu", "Lalitpur", "Bhaktapur"];
    const valley = insideValleyDistricts.includes(address.district)
      ? "INSIDE"
      : "OUTSIDE";

    // Generate order ID
    const orderId = generateOrderId();

    // Extract inventory product IDs for tracking (if linked)
    const inventoryProductIds = items
      .map(item => item.product.inventoryProductId)
      .filter(Boolean);
    
    // Get the first inventory product ID for the main order tracking
    // If multiple products, all are stored in product_details
    const primaryInventoryProductId = inventoryProductIds[0] || null;
    const primaryWebsiteProductId = items[0]?.product.id || null;

    // Prepare product details for storage (includes inventory linking)
    const productDetails = {
      items: items.map((item) => ({
        website_product_id: item.product.id,
        inventory_product_id: item.product.inventoryProductId || null,
        inventory_sku: item.product.inventorySku || null,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize,
        image: item.product.image,
      })),
      subtotal,
      shipping_cost: shippingCost,
      payment_method: paymentMethod,
      customer_email: address.email,
    };

    // Insert order into Supabase
    const { data: newOrder, error } = await supabase
      .from("orders")
      .insert({
        order_id: orderId,
        customer_name: address.fullName,
        cell_number: address.phone,
        full_address: fullAddress,
        valley: valley,
        product: productDescription,
        product_details: productDetails,
        cash_on_delivery: paymentMethod === "cod" ? total : 0,
        pre_payment: paymentMethod !== "cod" ? total : 0,
        discount: 0,
        status: "intake",
        source: "website",
        // Inventory tracking columns
        inventory_product_id: primaryInventoryProductId,
        website_product_id: primaryWebsiteProductId,
        followup: notes || null,
        comment_history: [
          {
            id: crypto.randomUUID(),
            type: "system",
            message: `Order placed from website. Payment method: ${paymentMethod.toUpperCase()}`,
            author: "Website",
            userId: "website",
            source: "website",
            visibility: "internal",
            createdAt: new Date().toISOString(),
          },
        ],
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating order:", error);
      return NextResponse.json(
        { success: false, error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Increment order count for the website products
    for (const item of items) {
      await supabase.rpc('increment_order_count', {
        product_id: item.product.id,
        count: item.quantity,
      }).catch(err => {
        console.error('Error incrementing order count:', err);
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newOrder.id,
          orderNumber: orderId,
        },
        message: "Order placed successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
