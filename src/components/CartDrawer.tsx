"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal, getCartCount, openCheckout } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const shippingCost = getCartTotal() >= 3000 ? 0 : 150;
  const total = getCartTotal() + shippingCost;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E8DDD4]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[#5D3A1A]" />
                <h2 className="text-xl font-serif text-[#2C1810]">
                  Your Cart ({getCartCount()})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-[#F5EDE6] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#5D3A1A]" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-[#E8DDD4] mb-4" />
                  <p className="text-lg font-serif text-[#2C1810] mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-[#7A6252] mb-6">
                    Add some beautiful bags to your cart
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 bg-[#8B5A2B] text-white rounded-full text-sm font-medium hover:bg-[#5D3A1A] transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 p-4 bg-[#F5EDE6] rounded-2xl"
                    >
                      {/* Product Image */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-[#2C1810] text-sm font-medium truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-[#7A6252] mb-2">
                          {item.product.category}
                        </p>
                        <p className="text-sm font-semibold text-[#5D3A1A]">
                          {formatPrice(item.product.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-[#E8DDD4] transition-colors"
                            >
                              <Minus className="w-3 h-3 text-[#5D3A1A]" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-[#2C1810]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-[#E8DDD4] transition-colors"
                            >
                              <Plus className="w-3 h-3 text-[#5D3A1A]" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#E8DDD4] p-6 space-y-4 bg-white">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-[#7A6252]">Subtotal</span>
                  <span className="font-medium text-[#2C1810]">
                    {formatPrice(getCartTotal())}
                  </span>
                </div>
                
                {/* Shipping */}
                <div className="flex justify-between text-sm">
                  <span className="text-[#7A6252]">Shipping</span>
                  <span className="font-medium text-[#2C1810]">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>

                {/* Free Shipping Progress */}
                {getCartTotal() < 3000 && (
                  <div className="text-xs text-[#7A6252] bg-[#F5EDE6] p-3 rounded-lg">
                    Add {formatPrice(3000 - getCartTotal())} more for free shipping! 🎉
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between pt-4 border-t border-[#E8DDD4]">
                  <span className="font-serif text-lg text-[#2C1810]">Total</span>
                  <span className="font-serif text-xl text-[#2C1810]">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={openCheckout}
                  className="block w-full py-4 bg-gradient-to-r from-[#2C1810] to-[#5D3A1A] text-white text-center rounded-xl font-medium hover:from-[#5D3A1A] hover:to-[#8B5A2B] transition-all"
                >
                  Proceed to Checkout
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 text-[#5D3A1A] text-sm font-medium hover:text-[#8B5A2B] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

