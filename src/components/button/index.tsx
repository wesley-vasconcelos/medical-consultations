import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "filled" | "transparent";
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  className = "",
  variant = "filled",
}) => {
  const baseStyles = `
    p-2 rounded 
    transition duration-200 ease-in-out 
    focus:outline-none 
    focus:ring-2 focus:ring-blue-500 
    ${className}
  `;

  const variantStyles =
    variant === "transparent"
      ? "bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-100"
      : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles}  ${variantStyles} 
                  text-xs sm:text-sm md:text-base lg:text-lg 
                  w-full`}
    >
      {children}
    </button>
  );
};

export default Button;
