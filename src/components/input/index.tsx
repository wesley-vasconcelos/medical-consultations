import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = "text",
  value = "",
  register,
  errors,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <input
        id={id}
        type={type}
        defaultValue={value}
        {...register(id)}
        className="border p-2 rounded w-full"
      />
      {errors[id] && (
        <p className="text-red-500 text-sm">{String(errors[id]?.message)}</p>
      )}
    </div>
  );
};

export default TextInput;
