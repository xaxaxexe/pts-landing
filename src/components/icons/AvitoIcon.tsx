import type { SVGProps } from "react";

export default function AvitoIcon({
  width = 61,
  height = 54,
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 61 54"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 54C27.941 54 36 45.9411 36 36C36 26.0588 27.941 18 18 18C8.05888 18 0 26.0588 0 36C0 45.9411 8.05888 54 18 54Z"
        fill="currentColor"
      />
      <path
        d="M49.07 54C55.1452 54 60.0699 49.0751 60.0699 42.9999C60.0699 36.9248 55.1452 32 49.07 32C42.9949 32 38.0699 36.9248 38.0699 42.9999C38.0699 49.0751 42.9949 54 49.07 54Z"
        fill="currentColor"
      />
      <path
        d="M20.9999 17C24.866 17 28 13.866 28 10C28 6.13401 24.866 3 20.9999 3C17.134 3 14 6.13401 14 10C14 13.866 17.134 17 20.9999 17Z"
        fill="currentColor"
      />
      <path
        d="M44.5 29C52.5081 29 59 22.5081 59 14.5C59 6.49186 52.5081 0 44.5 0C36.4918 0 30 6.49186 30 14.5C30 22.5081 36.4918 29 44.5 29Z"
        fill="currentColor"
      />
    </svg>
  );
}
