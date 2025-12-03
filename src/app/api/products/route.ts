import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { mapDbProductToProduct } from "@/types";
import type { DbProduct } from "@/lib/database/types";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .eq("show_on_website", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { success: false, error: "Failed to fetch products" },
        { status: 500 }
      );
    }

    const products = (data as DbProduct[]).map(mapDbProductToProduct);

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

