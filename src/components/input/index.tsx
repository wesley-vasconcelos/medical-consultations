import React from "react";
import { FieldErrors } from "react-hook-form";

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  errors: FieldErrors;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
  value = "",
  errors,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <input
        id={id}
        type={type}
        defaultValue={value}
        className="border p-2 rounded w-full"
      />
      {errors[id] && (
        <p className="text-red-500 text-sm">{String(errors[id]?.message)}</p>
      )}
    </div>
  );
};

export default TextInput;
