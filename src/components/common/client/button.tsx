'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";

type ButtonProps = {
  text: string;
  href: string;
  variant?: "solid" | "soft" | "outline" | "ghost" | "classic" | "surface" | undefined;
};

const MyButtonClient: React.FC<ButtonProps> = ({ text, href, variant = "classic" }) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(href)} variant={variant}>
      {text}
    </Button>
  );
};

export default MyButtonClient;
