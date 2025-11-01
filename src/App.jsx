import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";
import ModalConfirmed from "./components/ModalConfirmed";
import { products } from "./data/products";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || {};
    } catch {
      return {};
    }
  });

  const [modalConfirmed, setModalConfirmed] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(productId) {
    const id = String(productId);
    setCart(prev => {
      const next = { ...prev };
      const product = products.find(p => String(p.id) === id);
      if (!product) return prev;
      if (next[id]) next[id] = { ...next[id], qty: next[id].qty + 1 };
      else next[id] = { ...product, qty: 1 };
      return next;
    });
  }

  function updateQty(productId, qty) {
    const id = String(productId);
    setCart(prev => {
      const next = { ...prev };
      if (!next[id]) return prev;
      const parsedQty = Number(qty);
      if (parsedQty <= 0) delete next[id];
      else next[id] = { ...next[id], qty: parsedQty };
      return next;
    });
  }

  function removeFromCart(productId) {
    setCart(prev => {
      const next = structuredClone(prev);
      delete next[productId];
      return next;
    });
  }

  const totalItems = Object.values(cart).reduce((s, p) => s + p.qty, 0);
  const orderTotal = Object.values(cart).reduce((s, p) => s + p.qty * p.price, 0);

  return (
    <div className="min-h-screen bg-[#fbf5f2] text-[#2b1f1b] relative">

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold mb-8">Desserts</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(prod => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAdd={addToCart}
              inCartQty={cart[String(prod.id)]?.qty || 0}
              onQtyChange={updateQty}
            />
          ))}
        </div>
      </div>

      <div className="hidden lg:block fixed top-0 right-0 h-full w-[360px] bg-[#ffffff] shadow-xl border-l border-gray-100 p-6 overflow-y-auto">
        <CartSidebar
          cartItems={Object.values(cart)}
          totalItems={totalItems}
          orderTotal={orderTotal}
          onRemove={removeFromCart}
          onQtyChange={updateQty}
          onConfirmOrder={() => setModalConfirmed(true)}
        />
      </div>

      <div className="block lg:hidden max-w-6xl mx-auto px-6 mt-12 pb-10">
        <CartSidebar
          cartItems={Object.values(cart)}
          totalItems={totalItems}
          orderTotal={orderTotal}
          onRemove={removeFromCart}
          onQtyChange={updateQty}
          onConfirmOrder={() => setModalConfirmed(true)}
        />
      </div>

      {modalConfirmed && (
        <ModalConfirmed
          cartItems={Object.values(cart)}
          orderTotal={orderTotal}
          onNewOrder={() => {
            setCart({});
            setModalConfirmed(false);
          }}
        />
      )}
    </div>
  );
}
