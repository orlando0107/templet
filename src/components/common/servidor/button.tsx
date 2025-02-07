import { Button } from "@radix-ui/themes";
import Link from "next/link";

type Props = {
  text: string;
  href: string;
  variant?: "solid" | "soft" | "outline" | "ghost" | "classic" | "surface" | undefined;
};

const MyButtonSever: React.FC<Props> = ({ text, href, variant = "classic" }) => {
  return (
    <Link href={href} passHref>
      <Button
        variant={variant}
      >
        {text}
      </Button>
    </Link>
  );
};

export default MyButtonSever;