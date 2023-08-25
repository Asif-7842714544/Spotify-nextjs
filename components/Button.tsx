import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button" }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `w-full rounded-full bg-gray-500 border border-transparent
           p-3 disabled:cunotal] disabled:opacity-50 text-black font-bold hover:opacity-75 transition`
        )}
      ></button>
    );
  }
);
Button.displayName = "Button";
export default Button;
