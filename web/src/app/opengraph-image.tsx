import { ImageResponse } from "next/og";

// Edge-rendered branded OG image for ALIRA. Next.js auto-wires this
// to og:image and twitter:image whenever a page in this segment is
// shared. Per-route opengraph-image.tsx files override.

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ALIRA — Spiritual Leadership & Consciousness Institute";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(ellipse at top, #2a1810 0%, #0a0908 60%, #000 100%)",
          color: "#f5e6c8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#d4a574",
          }}
        >
          ALIRA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: 20,
              color: "#f5e6c8",
            }}
          >
            Spiritual Leadership & Consciousness Institute
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#bca37f",
              maxWidth: 980,
              lineHeight: 1.5,
              fontStyle: "italic",
            }}
          >
            A global guidance and education organization dedicated to
            consciousness development and spiritual enlightenment.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 16,
            color: "#d4a574",
            fontWeight: 600,
            letterSpacing: "0.1em",
          }}
        >
          <span>alira.live</span>
          <span>· In partnership with Omni AI</span>
        </div>
      </div>
    ),
    size,
  );
}
