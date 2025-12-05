import type { SVGProps } from "react";

export default function UserIcon({
  width = 24,
  height = 28,
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 28"
      width={width}
      height={height}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.6509 16.9551C15.4797 16.8991 14.3974 16.4112 15.0737 14.3554H15.064C16.8269 12.5397 18.1742 9.618 18.1742 6.74154C18.1742 2.31862 15.2331 0 11.8149 0C8.39462 0 5.46969 2.31754 5.46969 6.74154C5.46969 9.62985 6.80939 12.5634 8.58308 14.3748C9.27446 16.1883 8.03815 16.8614 7.77969 16.9562C4.2 18.2506 0 20.6102 0 22.9395V23.8129C0 26.9866 6.15354 27.7082 11.8483 27.7082C17.5517 27.7082 23.6277 26.9866 23.6277 23.8129V22.9395C23.6277 20.5402 19.4072 18.1989 15.6509 16.9551Z"
        fill="currentColor"
        fillOpacity="0.5"
      />
    </svg>
  );
}
