import React from "react";

export function LeafBackground() {
  return (
    <>
      <style>{`
        @keyframes leafPulse {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 0.28; }
        }
        @keyframes leafPulseSlow {
          0%, 100% { opacity: 0.13; }
          50% { opacity: 0.22; }
        }
        @keyframes leafPulseTiny {
          0%, 100% { opacity: 0.11; }
          50% { opacity: 0.19; }
        }
        .leaf-pulse { animation: leafPulse 3s ease-in-out infinite; }
        .leaf-pulse-slow { animation: leafPulseSlow 4.5s ease-in-out infinite; }
        .leaf-pulse-tiny { animation: leafPulseTiny 6s ease-in-out infinite; }
      `}</style>

      <svg
        className="pointer-events-none absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* top-left large */}
        <g className="leaf-pulse" transform="translate(-30, -10) rotate(-25, 80, 80)"
          style={{ filter: "drop-shadow(0 0 10px rgba(255,255,230,0.15))" }}>
          <path className="fill-[#7a9655] dark:fill-[#4a7a55]"
            d="M80,10 C80,10 130,40 130,90 C130,130 100,155 80,160 C60,155 30,130 30,90 C30,40 80,10 80,10 Z" />
          <line x1="80" y1="15" x2="80" y2="155" stroke="#6b8a48" className="dark:[stroke:#3d6b47]" strokeWidth="1.2" />
          <line x1="80" y1="60" x2="110" y2="75" stroke="#6b8a48" strokeWidth="0.8" />
          <line x1="80" y1="80" x2="115" y2="95" stroke="#6b8a48" strokeWidth="0.8" />
          <line x1="80" y1="100" x2="108" y2="118" stroke="#6b8a48" strokeWidth="0.8" />
          <line x1="80" y1="60" x2="50" y2="75" stroke="#6b8a48" strokeWidth="0.8" />
          <line x1="80" y1="80" x2="45" y2="95" stroke="#6b8a48" strokeWidth="0.8" />
          <line x1="80" y1="100" x2="52" y2="118" stroke="#6b8a48" strokeWidth="0.8" />
        </g>

        {/* top-left second */}
        <g className="leaf-pulse-slow" transform="translate(60, 120) rotate(20, 35, 50)"
          style={{ filter: "drop-shadow(0 0 8px rgba(255,255,230,0.12))" }}>
          <path className="fill-[#7a9655] dark:fill-[#4a7a55]"
            d="M35,4 C35,4 62,22 62,52 C62,75 47,90 35,93 C23,90 8,75 8,52 C8,22 35,4 35,4 Z" />
          <line x1="35" y1="7" x2="35" y2="90" stroke="#6b8a48" strokeWidth="0.9" />
          <line x1="35" y1="35" x2="52" y2="45" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="35" y1="52" x2="54" y2="62" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="35" y1="35" x2="18" y2="45" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="35" y1="52" x2="16" y2="62" stroke="#6b8a48" strokeWidth="0.6" />
        </g>

        {/* left middle upper */}
        <g className="leaf-pulse-tiny" transform="translate(-20, 280) rotate(-10, 45, 65)"
          style={{ filter: "drop-shadow(0 0 8px rgba(255,255,230,0.10))" }}>
          <path className="fill-[#7a9655] dark:fill-[#4a7a55]"
            d="M45,5 C45,5 80,28 80,65 C80,94 60,112 45,116 C30,112 10,94 10,65 C10,28 45,5 45,5 Z" />
          <line x1="45" y1="8" x2="45" y2="112" stroke="#6b8a48" strokeWidth="1" />
          <line x1="45" y1="42" x2="65" y2="54" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="45" y1="62" x2="68" y2="74" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="45" y1="82" x2="63" y2="96" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="45" y1="42" x2="25" y2="54" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="45" y1="62" x2="22" y2="74" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="45" y1="82" x2="27" y2="96" stroke="#6b8a48" strokeWidth="0.7" />
        </g>

        {/* left middle lower */}
        <g className="leaf-pulse-slow" transform="translate(10, 500) rotate(-35, 35, 50)"
          style={{ filter: "drop-shadow(0 0 7px rgba(255,255,230,0.10))" }}>
          <path className="fill-[#7a9655] dark:fill-[#4a7a55]"
            d="M35,4 C35,4 62,22 62,52 C62,75 47,90 35,93 C23,90 8,75 8,52 C8,22 35,4 35,4 Z" />
          <line x1="35" y1="7" x2="35" y2="90" stroke="#6b8a48" strokeWidth="0.9" />
          <line x1="35" y1="35" x2="52" y2="45" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="35" y1="52" x2="54" y2="62" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="35" y1="35" x2="18" y2="45" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="35" y1="52" x2="16" y2="62" stroke="#6b8a48" strokeWidth="0.6" />
        </g>

        {/* top-right medium */}
        <g className="leaf-pulse-slow" transform="translate(820, -20) rotate(40, 50, 70)"
          style={{ filter: "drop-shadow(0 0 8px rgba(255,255,230,0.12))" }}>
          <path className="fill-[#7a9655] dark:fill-[#4a7a55]"
            d="M50,5 C50,5 90,30 90,72 C90,105 68,125 50,130 C32,125 10,105 10,72 C10,30 50,5 50,5 Z" />
          <line x1="50" y1="10" x2="50" y2="125" stroke="#6b8a48" strokeWidth="1" />
          <line x1="50" y1="45" x2="72" y2="58" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="50" y1="65" x2="75" y2="78" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="50" y1="85" x2="70" y2="100" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="50" y1="45" x2="28" y2="58" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="50" y1="65" x2="25" y2="78" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="50" y1="85" x2="30" y2="100" stroke="#6b8a48" strokeWidth="0.7" />
        </g>

        {/* top-right second */}
        <g className="leaf-pulse-tiny" transform="translate(750, 100) rotate(60, 35, 50)"
          style={{ filter: "drop-shadow(0 0 7px rgba(255,255,230,0.10))" }}>
          <path className="fill-[#7a9655] dark:fill-[#4a7a55]"
            d="M35,4 C35,4 62,22 62,52 C62,75 47,90 35,93 C23,90 8,75 8,52 C8,22 35,4 35,4 Z" />
          <line x1="35" y1="7" x2="35" y2="90" stroke="#6b8a48" strokeWidth="0.9" />
          <line x1="35" y1="35" x2="52" y2="45" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="35" y1="52" x2="54" y2="62" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="35" y1="35" x2="18" y2="45" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="35" y1="52" x2="16" y2="62" stroke="#6b8a48" strokeWidth="0.6" />
        </g>

        {/* right middle upper */}
        <g className="leaf-pulse" transform="translate(870, 260) rotate(15, 45, 65)"
          style={{ filter: "drop-shadow(0 0 8px rgba(255,255,230,0.12))" }}>
          <path className="fill-[#7a9655] dark:fill-[#4a7a55]"
            d="M45,5 C45,5 80,28 80,65 C80,94 60,112 45,116 C30,112 10,94 10,65 C10,28 45,5 45,5 Z" />
          <line x1="45" y1="8" x2="45" y2="112" stroke="#6b8a48" strokeWidth="1" />
          <line x1="45" y1="42" x2="65" y2="54" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="45" y1="62" x2="68" y2="74" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="45" y1="82" x2="63" y2="96" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="45" y1="42" x2="25" y2="54" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="45" y1="62" x2="22" y2="74" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="45" y1="82" x2="27" y2="96" stroke="#6b8a48" strokeWidth="0.7" />
        </g>

        {/* mid-right tiny */}
        <g className="leaf-pulse-tiny" transform="translate(860, 380) rotate(70, 30, 40)"
          style={{ filter: "drop-shadow(0 0 6px rgba(255,255,230,0.10))" }}>
          <path className="fill-[#7a9655] dark:fill-[#4a7a55]"
            d="M30,3 C30,3 54,18 54,43 C54,63 41,75 30,78 C19,75 6,63 6,43 C6,18 30,3 30,3 Z" />
          <line x1="30" y1="5" x2="30" y2="75" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="30" y1="28" x2="44" y2="36" stroke="#6b8a48" strokeWidth="0.5" />
          <line x1="30" y1="45" x2="46" y2="53" stroke="#6b8a48" strokeWidth="0.5" />
          <line x1="30" y1="28" x2="16" y2="36" stroke="#6b8a48" strokeWidth="0.5" />
          <line x1="30" y1="45" x2="14" y2="53" stroke="#6b8a48" strokeWidth="0.5" />
        </g>

        {/* right middle lower */}
        <g className="leaf-pulse-slow" transform="translate(845, 520) rotate(-20, 40, 55)"
          style={{ filter: "drop-shadow(0 0 7px rgba(255,255,230,0.10))" }}>
          <path className="fill-[#7a9655] dark:fill-[#4a7a55]"
            d="M40,5 C40,5 72,25 72,58 C72,84 54,100 40,104 C26,100 8,84 8,58 C8,25 40,5 40,5 Z" />
          <line x1="40" y1="8" x2="40" y2="100" stroke="#6b8a48" strokeWidth="0.9" />
          <line x1="40" y1="38" x2="58" y2="48" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="40" y1="55" x2="60" y2="65" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="40" y1="38" x2="22" y2="48" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="40" y1="55" x2="20" y2="65" stroke="#6b8a48" strokeWidth="0.6" />
        </g>

        {/* bottom-left small */}
        <g className="leaf-pulse-slow" transform="translate(40, 780) rotate(15, 40, 55)"
          style={{ filter: "drop-shadow(0 0 8px rgba(255,255,230,0.10))" }}>
          <path className="fill-[#7a9655] dark:fill-[#4a7a55]"
            d="M40,5 C40,5 72,25 72,58 C72,84 54,100 40,104 C26,100 8,84 8,58 C8,25 40,5 40,5 Z" />
          <line x1="40" y1="8" x2="40" y2="100" stroke="#6b8a48" strokeWidth="0.9" />
          <line x1="40" y1="38" x2="58" y2="48" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="40" y1="55" x2="60" y2="65" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="40" y1="38" x2="22" y2="48" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="40" y1="55" x2="20" y2="65" stroke="#6b8a48" strokeWidth="0.6" />
        </g>

        {/* bottom-left second */}
        <g className="leaf-pulse-tiny" transform="translate(120, 820) rotate(-20, 30, 45)"
          style={{ filter: "drop-shadow(0 0 6px rgba(255,255,230,0.10))" }}>
          <path className="fill-[#7a9655] dark:fill-[#4a7a55]"
            d="M30,3 C30,3 54,18 54,43 C54,63 41,75 30,78 C19,75 6,63 6,43 C6,18 30,3 30,3 Z" />
          <line x1="30" y1="5" x2="30" y2="75" stroke="#6b8a48" strokeWidth="0.7" />
          <line x1="30" y1="28" x2="44" y2="36" stroke="#6b8a48" strokeWidth="0.5" />
          <line x1="30" y1="45" x2="46" y2="53" stroke="#6b8a48" strokeWidth="0.5" />
          <line x1="30" y1="28" x2="16" y2="36" stroke="#6b8a48" strokeWidth="0.5" />
          <line x1="30" y1="45" x2="14" y2="53" stroke="#6b8a48" strokeWidth="0.5" />
        </g>

        {/* bottom-right large */}
        <g className="leaf-pulse" transform="translate(780, 720) rotate(-50, 80, 90)"
          style={{ filter: "drop-shadow(0 0 10px rgba(255,255,230,0.15))" }}>
          <path className="fill-[#7a9655] dark:fill-[#4a7a55]"
            d="M80,10 C80,10 130,40 130,90 C130,130 100,155 80,160 C60,155 30,130 30,90 C30,40 80,10 80,10 Z" />
          <line x1="80" y1="15" x2="80" y2="155" stroke="#6b8a48" strokeWidth="1.2" />
          <line x1="80" y1="60" x2="110" y2="75" stroke="#6b8a48" strokeWidth="0.8" />
          <line x1="80" y1="80" x2="115" y2="95" stroke="#6b8a48" strokeWidth="0.8" />
          <line x1="80" y1="100" x2="108" y2="118" stroke="#6b8a48" strokeWidth="0.8" />
          <line x1="80" y1="60" x2="50" y2="75" stroke="#6b8a48" strokeWidth="0.8" />
          <line x1="80" y1="80" x2="45" y2="95" stroke="#6b8a48" strokeWidth="0.8" />
          <line x1="80" y1="100" x2="52" y2="118" stroke="#6b8a48" strokeWidth="0.8" />
        </g>

        {/* bottom-right second */}
        <g className="leaf-pulse-slow" transform="translate(700, 830) rotate(30, 35, 50)"
          style={{ filter: "drop-shadow(0 0 7px rgba(255,255,230,0.10))" }}>
          <path className="fill-[#7a9655] dark:fill-[#4a7a55]"
            d="M35,4 C35,4 62,22 62,52 C62,75 47,90 35,93 C23,90 8,75 8,52 C8,22 35,4 35,4 Z" />
          <line x1="35" y1="7" x2="35" y2="90" stroke="#6b8a48" strokeWidth="0.9" />
          <line x1="35" y1="35" x2="52" y2="45" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="35" y1="52" x2="54" y2="62" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="35" y1="35" x2="18" y2="45" stroke="#6b8a48" strokeWidth="0.6" />
          <line x1="35" y1="52" x2="16" y2="62" stroke="#6b8a48" strokeWidth="0.6" />
        </g>
      </svg>
    </>
  );
}