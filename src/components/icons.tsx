import { type SVGProps } from 'react';

export function AinubidhiLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22V12" />
      <path d="M2 7l10-5 10 5-10 5z" />
      <path d="M2 7v10l10 5 10-5V7" />
      <path d="M12 12L22 7" />
      <path d="M9.5 9a2.5 2.5 0 1 1 5 0" />
      <path d="M12 11.5v-5" />
    </svg>
  );
}
