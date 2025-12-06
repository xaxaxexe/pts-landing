"use client";

import Portal from "@/components/Portal";
import MemoryCardIcon from "@/components/icons/MemoryCardIcon";
import SsdIcon from "@/components/icons/SsdIcon";
import SpecSelect from "./SpecSelect";

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
					<div className="flex flex-col justify-between bg-carbon rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl min-h-128">
						<div>
							<h2 className="text-xl lg:text-2xl font-bold text-start text-white mb-5">
								Редактирование
							</h2>
							<div className="flex flex-col gap-4">
								<SpecSelect
									icon={<MemoryCardIcon className="w-5 h-5 text-white" />}
									label="Оперативная память"
									value="64 GB"
									// onClick={() => {
									// 	/* открыть dropdown */
									// }}
								/>{" "}
								<SpecSelect
									icon={<SsdIcon className="w-5 h-5 text-white" />}
									label="SSD"
									value="1 TB SSD"
									// onClick={() => {
									// 	/* открыть dropdown */
									// }}
								/>{" "}
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
