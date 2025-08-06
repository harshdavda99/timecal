import React from "react";

export default function FlyoutMenu({ items = [], activeItem, setActiveItem }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-2 w-48 space-y-1 border">
      {items.map((item) => (
        <button
          key={item.key}
          className={`w-full text-left px-3 py-2 text-sm rounded ${
            activeItem === item.key
              ? "bg-blue-100 text-blue-700 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveItem(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
