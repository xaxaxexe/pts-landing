import type { SVGProps } from "react";

export default function YoutubeIcon({
  width = 54,
  height = 54,
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  const clipId = "youtube-icon-clip";
  return (
    <svg
      viewBox="0 0 54 54"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${clipId})`}>
        <path d="M23.3947 32.1872L32.2297 27.0001L23.3947 21.813V32.1872Z" fill="currentColor" />
        <path
          d="M26.9899 0C12.0822 0 0 12.0822 0 26.9899C0 41.8975 12.0822 53.9797 26.9899 53.9797C41.8975 53.9797 53.9797 41.8975 53.9797 26.9899C53.9797 12.0822 41.8975 0 26.9899 0ZM40.4848 31.8185C40.4848 36.4679 35.8354 36.4679 35.8354 36.4679H18.1444C13.4949 36.4679 13.4949 31.8185 13.4949 31.8185V22.1718C13.4949 17.5223 18.1444 17.5223 18.1444 17.5223H35.8354C40.4848 17.5223 40.4848 22.1718 40.4848 22.1718V31.8185Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="53.9797" height="53.9797" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}
