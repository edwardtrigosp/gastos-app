import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="64"
          height="64"
        >
          <ellipse cx="32" cy="36" rx="22" ry="18" fill="#f48fb1" />
          <circle cx="32" cy="24" r="16" fill="#f48fb1" />
          <ellipse
            cx="20"
            cy="12"
            rx="6"
            ry="8"
            fill="#f48fb1"
            transform="rotate(-15 20 12)"
          />
          <ellipse
            cx="20"
            cy="12"
            rx="4"
            ry="5.5"
            fill="#e91e90"
            transform="rotate(-15 20 12)"
          />
          <ellipse
            cx="44"
            cy="12"
            rx="6"
            ry="8"
            fill="#f48fb1"
            transform="rotate(15 44 12)"
          />
          <ellipse
            cx="44"
            cy="12"
            rx="4"
            ry="5.5"
            fill="#e91e90"
            transform="rotate(15 44 12)"
          />
          <ellipse cx="32" cy="28" rx="8" ry="6" fill="#e91e90" />
          <ellipse cx="29" cy="28" rx="2" ry="1.5" fill="#c2185b" />
          <ellipse cx="35" cy="28" rx="2" ry="1.5" fill="#c2185b" />
          <circle cx="25" cy="21" r="3" fill="white" />
          <circle cx="25.5" cy="20.5" r="1.5" fill="#1a1a2e" />
          <circle cx="39" cy="21" r="3" fill="white" />
          <circle cx="39.5" cy="20.5" r="1.5" fill="#1a1a2e" />
          <rect x="28" y="5" width="8" height="2.5" rx="1.2" fill="#ffd54f" />
          <rect x="16" y="48" width="6" height="8" rx="3" fill="#e91e90" />
          <rect x="42" y="48" width="6" height="8" rx="3" fill="#e91e90" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
