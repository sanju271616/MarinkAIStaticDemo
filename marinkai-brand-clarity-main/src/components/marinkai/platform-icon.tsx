export function PlatformIcon({ platform, className = "size-4" }: { platform: string; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true as const,
  };
  switch (platform) {
    case "Facebook":
      return (
        <svg {...common}>
          <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.8c0-.9.3-1.5 1.6-1.5H16.6V4.6A21 21 0 0 0 14.4 4.5c-2.3 0-3.9 1.4-3.9 4v2H8v3h2.5V21h3Z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "YouTube":
      return (
        <svg {...common}>
          <path d="M21.6 7.5c-.2-1.1-1-1.9-2-2.1C17.7 5 12 5 12 5s-5.7 0-7.6.4c-1 .2-1.8 1-2 2.1C2 9.3 2 12 2 12s0 2.7.4 4.5c.2 1.1 1 1.9 2 2.1C6.3 19 12 19 12 19s5.7 0 7.6-.4c1-.2 1.8-1 2-2.1.4-1.8.4-4.5.4-4.5s0-2.7-.4-4.5ZM10 15.2V8.8l5.5 3.2L10 15.2Z" />
        </svg>
      );
    case "TikTok":
      return (
        <svg {...common}>
          <path d="M15.9 3h-2.8v11.4a2.4 2.4 0 1 1-2.4-2.4c.3 0 .5 0 .7.1V9.2a5.2 5.2 0 1 0 4.5 5.2V8.5a5.5 5.5 0 0 0 3.4 1.2V6.9a3.9 3.9 0 0 1-3.4-3.9Z" />
        </svg>
      );
    case "X":
      return (
        <svg {...common}>
          <path d="M17.5 3h3.3l-7.2 8.2L21.9 21h-6l-4.4-5.6L6.3 21H3l7.5-8.6L2.4 3h6.1l4.1 5.3L17.5 3Zm-1.1 16h1.8L7.3 4.8H5.4L16.4 19Z" />
        </svg>
      );
    default:
      return null;
  }
}
