import type React from "react";

export function handleEscape(
	event: KeyboardEvent | React.KeyboardEvent,
	onEscape: () => void,
	options?: { stopPropagation?: boolean; preventDefault?: boolean }
): boolean {
	if (event.key !== "Escape") return false;
	if (options?.preventDefault) {
		event.preventDefault();
	}
	if (options?.stopPropagation) {
		event.stopPropagation();
	}
	onEscape();
	return true;
}
