import type React from "react";
import { Avatar } from "radix-ui";
import styles from "@/components/common/servidor/avat.module.css";

interface AvatarProps {
	src?: string;
	alt?: string;
    nosrc?: string
}

const Myavatar: React.FC<AvatarProps> = ({ src, alt, nosrc= " "}) => {
    const initial = nosrc.charAt(0).toUpperCase();
	return (
		<div className="flex items-center gap-2">
			<Avatar.Root className={styles.AvatarRoot}>
				<Avatar.Image
					className={styles.AvatarImage}
					src={src || undefined}
					alt={alt || undefined}
				/>
				<Avatar.Fallback className={styles.AvatarFallback} delayMs={600}>
					{src ? "" : initial}
				</Avatar.Fallback>
			</Avatar.Root>
		</div>
	);
}

export default Myavatar;