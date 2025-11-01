import React from "react";
import checkIcon from "../assets/images/icon-order-confirmed.svg";

export default function ModalConfirmed({ cartItems, orderTotal, onNewOrder }) {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        lg:bg-black/50
        animate-fadeIn
      "
    >
      <div
        className="
          bg-white
          rounded-none
          lg:rounded-2xl
          shadow-none
          lg:shadow-lg
          p-8
          w-full
          h-full
          lg:h-auto lg:w-[90%] lg:max-w-md
          flex flex-col
          justify-center
          animate-scaleUp
        "
      >
        <div className="text-center lg:text-left">
          <img
            src={checkIcon}
            alt="confirmed"
            className="w-12 h-12 mb-5 mx-auto lg:mx-0"
          />
          <h2 className="text-3xl font-extrabold text-[#2b1f1b]">
            Order Confirmed
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            We hope you enjoy your food!
          </p>
        </div>

        <div className="bg-[#f9f3f1] rounded-xl mt-6 p-4 overflow-y-auto max-h-[50vh] lg:max-h-[45vh]">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image.thumbnail}
                    alt={item.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm text-[#2b1f1b]">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      <span className="text-[#c83a19] font-semibold">
                        {item.qty}x
                      </span>{" "}
                      @ ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-sm text-[#2b1f1b]">
                  ${(item.qty * item.price).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">Order Total</span>
            <span className="font-extrabold text-lg text-[#2b1f1b]">
              ${orderTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={onNewOrder}
          className="
            mt-8 w-full bg-[#c83a19] text-white py-3 rounded-full
            font-semibold hover:opacity-95
            lg:mt-6
          "
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}
