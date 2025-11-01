import React from "react";
import icon from "../assets/images/illustration-empty-cart.svg";
import iconConfirm from "../assets/images/icon-carbon-neutral.svg";
import iconRemov from "../assets/images/icon-remove-item.svg";

export default function CartSidebar({ cartItems, totalItems, orderTotal, onRemove, onQtyChange,  onConfirmOrder }) {
  return (
    <aside className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-[#c83a19] mb-4">Your Cart ({totalItems})</h2>

      {cartItems.length === 0 ? (
        <div className="p-6 rounded-lg bg-[#f9f3f1] text-center">
          <img src={icon} alt="empty" className="w-24 mx-auto mb-2 opacity-70" />
          <p className="text-sm text-gray-500">Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 max-h-[48vh] overflow-auto">
            {cartItems.map(item => (
              <li key={item.id} className="py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold text-[#c83a19]">{item.qty}x</span>
                      {" "}@ ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <div className="flex items-center gap-2 bg-[#f9f3f1] rounded-full px-3 py-1">
                    <button
                      onClick={() => onQtyChange(item.id, Math.max(0, item.qty - 1))}
                      className="w-6 h-6 flex items-center justify-center rounded-full border border-[#c83a19] text-[#c83a19] text-xs font-bold hover:bg-[#c83a19] hover:text-white transition"
                    >
                      −
                    </button>
                    <span className="text-xs font-semibold">{item.qty}</span>
                    <button
                      onClick={() => onQtyChange(item.id, item.qty + 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-full border border-[#c83a19] text-[#c83a19] text-xs font-bold hover:bg-[#c83a19] hover:text-white transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      aria-label="remove"
                      className="text-gray-400 hover:text-red-500 ml-5"
                    >
                      <img src={iconRemov} alt="remove" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Order Total</span>
              <span className="font-bold text-lg">${orderTotal.toFixed(2)}</span>
            </div>

            <div className="mt-4 bg-[#f6f0ee] rounded-md p-3 text-sm flex items-center gap-2">
              <img src={iconConfirm} alt="" />
              <div className="text-xs text-gray-600">
                This is a carbon-neutral delivery
              </div>
            </div>

            <button
              onClick={onConfirmOrder}
              className="mt-6 w-full bg-[#c83a19] text-white py-3 rounded-full font-semibold hover:opacity-95"
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
