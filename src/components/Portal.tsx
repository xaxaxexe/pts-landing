import { useState, useLayoutEffect, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
	children: ReactNode;
	wrapperId?: string;
	lockScroll?: boolean;
	disablePortal?: boolean;
	anchorElement?: HTMLElement | null;
}

function createWrapperAndAppendToBody(wrapperId: string) {
	const wrapperElement = document.createElement("div");
	wrapperElement.setAttribute("id", wrapperId);
	document.body.append(wrapperElement);
	return wrapperElement;
}

function Portal({
	children,
	wrapperId = "portal-wrapper",
	lockScroll = false,
	disablePortal = false,
	anchorElement = null,
}: PortalProps) {
	const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
		null
	);
	const localContainerRef = useRef<HTMLDivElement>(null);
	const originalStylesRef = useRef({
		overflow: "",
		paddingRight: "",
	});

	useEffect(() => {
		if (lockScroll) {
			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth;
			const originalOverflow = document.body.style.overflow;
			const originalPaddingRight = document.body.style.paddingRight;

			originalStylesRef.current = {
				overflow: originalOverflow,
				paddingRight: originalPaddingRight,
			};
			document.body.style.paddingRight = `${scrollbarWidth}px`;
			document.body.style.overflow = "hidden";

			return () => {
				document.body.style.overflow = originalStylesRef.current.overflow;
				document.body.style.paddingRight =
					originalStylesRef.current.paddingRight;
			};
		}
	}, [lockScroll]);

	useLayoutEffect(() => {
		if (disablePortal) {
			return;
		}

		let element = document.getElementById(wrapperId);
		let created = false;

		if (!element) {
			created = true;
			element = createWrapperAndAppendToBody(wrapperId);
		}

		setWrapperElement(element);

		return () => {
			if (created && element) {
				element.remove();
			}
		};
	}, [wrapperId, disablePortal]);

	if (disablePortal) {
		return (
			<div
				ref={localContainerRef}
				className="relative"
				style={{
					position: "absolute",
					zIndex: 50,
					width: anchorElement ? anchorElement.offsetWidth + "px" : "auto",
				}}
			>
				{children}
			</div>
		);
	}

	if (!wrapperElement) return null;
	return createPortal(children, wrapperElement);
}

export default Portal;
