import React from "react";
import iconCar from "../assets/images/icon-add-to-cart.svg";

export default function ProductCard({ product, onAdd, inCartQty, onQtyChange }) {
  const hasItems = inCartQty > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 transition-all">
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
        <picture>
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 640px)" srcSet={product.image.tablet} />
          <img
            src={product.image.mobile}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500"
            loading="lazy"
          />
        </picture>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 transition-all duration-300">
          {hasItems ? (
            <div className="bg-[#c83a19] text-white rounded-full px-3 py-1 flex items-center gap-3 shadow-md">
              <button
                aria-label="decrease"
                onClick={() => onQtyChange(product.id, inCartQty - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
              >
                −
              </button>

              <div className="font-semibold select-none">{inCartQty}</div>

              <button
                aria-label="increase"
                onClick={() => onAdd(product.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAdd(product.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#c83a19] bg-white text-[#5a271b] font-medium text-sm shadow-sm hover:shadow-md transition-all"
            >
              <img src={iconCar} alt="icon carrinho" />
              Add to Cart
            </button>
          )}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-500">{product.category}</p>
        <h3 className="font-semibold mt-1">{product.name}</h3>
        <p className="mt-2 text-[#c83a19] font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
