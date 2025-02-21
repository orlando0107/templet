import LayoutPublic from "@/components/layout/layout";
import { Flex, Link } from "@radix-ui/themes";

export default function page() {
  return (
    <>
      <LayoutPublic>
        <div className="justify-center m-10 p-2 justify-center-items">
          <Flex direction="column" className="flex justify-center items-center gap-2">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
            <Link href="/auth/forgotten-password">Olvide mi Contrasena</Link>
            <Link href="/dashboard">Dashboard</Link>
          </Flex>
        </div>
      </LayoutPublic>
    </>
  );
}
