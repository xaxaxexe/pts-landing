import MemoryCardIcon from "@/components/icons/MemoryCardIcon";
import GpuCardIcon from "@/components/icons/GpuCardIcon";
import ProcessorIcon from "@/components/icons/ProcessorIcon";
import SsdIcon from "@/components/icons/SsdIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import type { ReactNode } from "react";

type SpecIcon = "memory" | "gpu" | "cpu" | "ssd";

type Spec = {
  icon: SpecIcon;
  label: string;
};

type ProductCardProps = {
  title: string;
  price: string;
  specs: Spec[];
  image?: ReactNode;
};

const iconMap: Record<SpecIcon, ReactNode> = {
  memory: <MemoryCardIcon className="h-6 w-6" />,
  gpu: <GpuCardIcon className="h-6 w-6" />,
  cpu: <ProcessorIcon className="h-6 w-6" />,
  ssd: <SsdIcon className="h-6 w-6" />,
};

export default function ProductCard({
  title,
  price,
  specs,
  image,
}: ProductCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl bg-carbon p-4">
      <div className="h-64 w-full overflow-hidden rounded-2xl bg-gray-100">
        {image}
      </div>
      <div className="flex items-center justify-between text-xl">
        <span className="font-bold">{title}</span>
        <span className="font-semibold">{price}</span>
      </div>
      <ul className="flex flex-col gap-2">
        {specs.map((spec) => (
          <li
            key={`${title}-${spec.label}`}
            className="flex items-center justify-start gap-1 text-graphite"
          >
            {iconMap[spec.icon]}
            <span className="text-sm font-medium">{spec.label}</span>
          </li>
        ))}
      </ul>
      <div className="flex w-full gap-2 mt-2">
        <button className="flex-1 cursor-pointer rounded-2xl bg-hero-gradient p-4 text-base font-semibold">
          Купить
        </button>
        <button className="cursor-pointer rounded-2xl bg-slate-24 px-4 py-3 text-base font-semibold">
          <SettingsIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
