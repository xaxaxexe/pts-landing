"use client";

import Portal from "@/components/Portal";
import MemoryCardIcon from "@/components/icons/MemoryCardIcon";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import SsdIcon from "@/components/icons/SsdIcon";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
	if (!isOpen) return null;

	return (
		<Portal lockScroll>
			<div className="fixed inset-0 z-50 flex items-center justify-center">
				<div
					className="absolute inset-0 bg-black/60 backdrop-blur-sm"
					onClick={onClose}
				/>

				<div className="relative z-10 w-full max-w-md mx-4">
					<div className="flex flex-col justify-between bg-carbon rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl min-h-118">
						<div>
							<h2 className="text-xl lg:text-2xl font-bold text-start text-white mb-5">
								Редактирование
							</h2>
							<div className="flex flex-col gap-4">
								<div className="flex items-center justify-between border-2 border-border bg-ink py-3 px-4 rounded-xl cursor-pointer">
									<div className="flex gap-2">
										<MemoryCardIcon className="w-6 h-6 text-white" />
										<span className="text-base font-medium">64 GB</span>
									</div>
									<ChevronDownIcon className="w-4 h-4 text-graphite" />
								</div>
								<div className="flex items-center justify-between border-2 border-border bg-ink py-3 px-4 rounded-xl cursor-pointer">
									<div className="flex gap-2">
										<SsdIcon className="w-6 h-6 text-white" />
										<span className="text-base font-medium">1 TB SSD</span>
									</div>
									<ChevronDownIcon className="w-4 h-4 text-graphite" />
								</div>
							</div>
						</div>
						<button className="w-full cursor-pointer rounded-xl bg-hero-gradient p-3 text-base font-semibold">
							Купить
						</button>
					</div>
				</div>
			</div>
		</Portal>
	);
}
