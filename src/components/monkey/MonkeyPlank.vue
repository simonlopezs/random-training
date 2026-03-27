<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
    <!-- Shadow -->
    <ellipse cx="100" cy="178" rx="60" ry="6" fill="#e0d5c8" opacity="0.5" />
    <!-- Body (horizontal plank) -->
    <ellipse cx="105" cy="140" rx="42" ry="14" fill="#8B5E3C" />
    <ellipse cx="105" cy="141" rx="34" ry="9" fill="#C4956A" />
    <!-- Arms (elbows down) -->
    <rect x="60" y="140" width="9" height="25" rx="4" fill="#8B5E3C" />
    <rect x="80" y="140" width="9" height="25" rx="4" fill="#8B5E3C" />
    <!-- Forearms flat -->
    <ellipse cx="64" cy="168" rx="8" ry="4" fill="#6B4226" />
    <ellipse cx="84" cy="168" rx="8" ry="4" fill="#6B4226" />
    <!-- Legs straight back -->
    <rect x="140" y="138" width="9" height="28" rx="4" fill="#8B5E3C" transform="rotate(-5 140 138)" />
    <rect x="150" y="138" width="9" height="28" rx="4" fill="#8B5E3C" transform="rotate(-5 150 138)" />
    <!-- Feet -->
    <ellipse cx="143" cy="168" rx="7" ry="4" fill="#6B4226" />
    <ellipse cx="153" cy="168" rx="7" ry="4" fill="#6B4226" />
    <!-- Tail -->
    <path d="M148 132 Q165 120 160 140 Q158 150 152 142" stroke="#8B5E3C" stroke-width="4" fill="none" stroke-linecap="round" />
    <!-- Head -->
    <circle cx="50" cy="126" r="22" fill="#8B5E3C" />
    <circle cx="47" cy="128" r="14" fill="#C4956A" />
    <!-- Ears -->
    <circle cx="32" cy="112" r="9" fill="#8B5E3C" />
    <circle cx="32" cy="112" r="5" fill="#D4A574" />
    <circle cx="68" cy="112" r="9" fill="#8B5E3C" />
    <circle cx="68" cy="112" r="5" fill="#D4A574" />
    <!-- Eyes (determined) -->
    <circle cx="41" cy="124" r="3" fill="#2C1810" />
    <circle cx="53" cy="124" r="3" fill="#2C1810" />
    <circle cx="41.5" cy="123" r="1" fill="white" />
    <circle cx="53.5" cy="123" r="1" fill="white" />
    <!-- Eyebrows -->
    <line x1="37" y1="119" x2="44" y2="121" stroke="#2C1810" stroke-width="2" stroke-linecap="round" />
    <line x1="57" y1="119" x2="50" y2="121" stroke="#2C1810" stroke-width="2" stroke-linecap="round" />
    <!-- Mouth (concentrated) -->
    <line x1="42" y1="134" x2="52" y2="134" stroke="#2C1810" stroke-width="2" stroke-linecap="round" />
    <!-- Sweat -->
    <path d="M70 108 Q73 101 76 108 Q73 112 70 108Z" fill="#7EC8E3" />
    <!-- Timer bubble -->
    <text x="30" y="100" font-size="10" fill="#888" font-family="monospace">⏱</text>
  </svg>
</template>
