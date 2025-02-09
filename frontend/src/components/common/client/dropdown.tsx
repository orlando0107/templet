"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";

interface DropdownItem {
	label: string;
	href?: string;
	onClick?: () => void;
	className?: string;
}

interface DropdownProps {
	items: DropdownItem[];
	buttonLabel: ReactNode;
	className?: string;
	menuClassName?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
	items,
	buttonLabel,
	className = "",
	menuClassName = "",
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// Cerrar menú al hacer clic fuera
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative inline-block text-left" ref={menuRef}>
			<button
				className={clsx(
					"flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500",
					className,
				)}
				onClick={() => setIsOpen(!isOpen)}
				type="button"
				aria-haspopup="menu"
				aria-expanded={isOpen}
				aria-controls="dropdown-menu"
			>
				{buttonLabel}
			</button>

			{isOpen && (
				<div
					id="dropdown-menu"
					className={clsx(
						"absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 ease-out",
						menuClassName,
					)}
					role="menu"
					aria-labelledby="dropdown-button"
				>
					{items.map((item) => (
						<Link
							key={item.href || item.label}
							href={item.href || "#"}
							onClick={(e) => {
								if (item.onClick) {
									e.preventDefault();
									item.onClick();
								}
								setIsOpen(false);
							}}
							role="menuitem" 
							className={clsx(
								"block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all",
								item.className,
							)}
						>
							{item.label}
						</Link>
					))}
				</div>
			)}
		</div>
	);
};
