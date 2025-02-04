import { Flex, Link } from "@radix-ui/themes";
import Nav from "./Nav";


export default function PublicHeader() {
    return (
        <Flex justify="between" align="center" p="4" style={{ borderBottom: "0.5px solid var(--gray-a5)" }}>
            <Link href="/" size="4" weight="bold" style={{ textDecoration: "none" }}>
                Mi App
            </Link>
            <Nav />
        </Flex>
    );
}