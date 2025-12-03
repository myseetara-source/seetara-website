"use client";

import { useCart } from "@/context/CartContext";
import CheckoutModal from "./CheckoutModal";

export default function GlobalModals() {
  const { isCheckoutOpen, setIsCheckoutOpen } = useCart();

  return (
    <CheckoutModal
      isOpen={isCheckoutOpen}
      onClose={() => setIsCheckoutOpen(false)}
    />
  );
}

