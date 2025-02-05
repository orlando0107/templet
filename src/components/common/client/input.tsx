'use client';

import React from "react";
import clsx from "clsx"; // Importamos clsx para manejar clases dinámicas

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, placeholder, className, ...rest }, ref) => {
    return (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        ref={ref}
        className={clsx(
          "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", 
          className // Si el usuario pasa una clase, se añade
        )}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";
