import Footer from "@/components/layout/Foother";
import PublicHeader from "@/components/layout/PublicHEader";
import { Flex } from "@radix-ui/themes";


export default function Home() {
  return (
    <>
      <PublicHeader />
      <Flex direction={"column"} height={"100vh"} gap={"2"} p={"2"}>
        <h1 className="text-2xl font-bold">Temple en construccion ...</h1>
      </Flex>
      <Footer />
    </>
  );
}
