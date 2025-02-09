import Footer from "@/components/layout/Foother";
import PrivateHeader from "./PrivateHeader";

export default function LayoutPrivate({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen">
			<PrivateHeader />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}
