'use client';
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";

type ButtonProps = {
  text: string;
  href: string;
  variant?: "solid" | "soft" | "outline" | "ghost" | "classic" | "surface" | undefined;
  className?: string;
};

const MyButtonClient: React.FC<ButtonProps> = ({ text, href, variant = "classic", className}) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(href)} variant={variant}
    className={className}>
      {text}
    </Button>
  );
};

export default MyButtonClient;
