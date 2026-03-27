<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
    <!-- Shadow -->
    <ellipse cx="100" cy="185" rx="55" ry="6" fill="#e0d5c8" opacity="0.5" />
    <!-- Body (plank-like, angled) -->
    <ellipse cx="105" cy="135" rx="35" ry="15" fill="#8B5E3C" transform="rotate(-10 105 135)" />
    <ellipse cx="105" cy="136" rx="27" ry="10" fill="#C4956A" transform="rotate(-10 105 136)" />
    <!-- Arms down -->
    <rect x="62" y="140" width="9" height="30" rx="4" fill="#8B5E3C" />
    <rect x="78" y="142" width="9" height="28" rx="4" fill="#8B5E3C" />
    <!-- Hands -->
    <ellipse cx="66" cy="172" rx="7" ry="4" fill="#6B4226" />
    <ellipse cx="82" cy="172" rx="7" ry="4" fill="#6B4226" />
    <!-- Back leg extended -->
    <rect x="130" y="138" width="9" height="32" rx="4" fill="#8B5E3C" transform="rotate(-20 130 138)" />
    <ellipse cx="140" cy="172" rx="8" ry="5" fill="#6B4226" />
    <!-- Front leg (knee to chest) -->
    <rect x="105" y="140" width="9" height="22" rx="4" fill="#8B5E3C" transform="rotate(30 105 140)" />
    <ellipse cx="98" cy="158" rx="8" ry="5" fill="#6B4226" />
    <!-- Tail -->
    <path d="M138 128 Q155 115 150 135 Q148 145 142 138" stroke="#8B5E3C" stroke-width="4" fill="none" stroke-linecap="round" />
    <!-- Head -->
    <circle cx="60" cy="118" r="22" fill="#8B5E3C" />
    <circle cx="57" cy="120" r="14" fill="#C4956A" />
    <!-- Ears -->
    <circle cx="42" cy="104" r="9" fill="#8B5E3C" />
    <circle cx="42" cy="104" r="5" fill="#D4A574" />
    <circle cx="78" cy="104" r="9" fill="#8B5E3C" />
    <circle cx="78" cy="104" r="5" fill="#D4A574" />
    <!-- Eyes -->
    <circle cx="51" cy="116" r="3" fill="#2C1810" />
    <circle cx="63" cy="116" r="3" fill="#2C1810" />
    <circle cx="51.5" cy="115" r="1" fill="white" />
    <circle cx="63.5" cy="115" r="1" fill="white" />
    <!-- Mouth -->
    <path d="M50 125 Q57 130 64 125" stroke="#2C1810" stroke-width="2" fill="none" stroke-linecap="round" />
    <!-- Motion lines -->
    <line x1="90" y1="162" x2="85" y2="168" stroke="#ccc" stroke-width="2" stroke-linecap="round" />
    <line x1="95" y1="165" x2="92" y2="172" stroke="#ccc" stroke-width="2" stroke-linecap="round" />
  </svg>
</template>
