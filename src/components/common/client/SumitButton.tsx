'use client';

import React from "react";
import { Button } from "@radix-ui/themes";

type ButtonProps = {
  text: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export const SubmitButton: React.FC<ButtonProps> = ({ text, type = "submit", disabled = false }) => {
  return (
    <Button type={type} disabled={disabled}>
      {text}
    </Button>
  );
};
