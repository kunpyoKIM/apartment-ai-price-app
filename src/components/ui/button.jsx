import React from "react";

export function Button({ className = "", size, variant, ...props }) {
  return (
    <button
      className={
        "inline-flex items-center justify-center whitespace-nowrap border px-3 py-2 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50 " +
        className
      }
      {...props}
    />
  );
}
