<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
    <!-- Shadow -->
    <ellipse cx="100" cy="188" rx="50" ry="6" fill="#e0d5c8" opacity="0.5" />
    <!-- Body (lying back slightly) -->
    <ellipse cx="100" cy="140" rx="28" ry="22" fill="#8B5E3C" />
    <ellipse cx="100" cy="142" rx="20" ry="15" fill="#C4956A" />
    <!-- Arms on ground for support -->
    <rect x="55" y="145" width="26" height="9" rx="4" fill="#8B5E3C" transform="rotate(-5 55 145)" />
    <rect x="119" y="145" width="26" height="9" rx="4" fill="#8B5E3C" transform="rotate(5 119 145)" />
    <!-- Hands -->
    <circle cx="52" cy="148" r="6" fill="#6B4226" />
    <circle cx="148" cy="148" r="6" fill="#6B4226" />
    <!-- Legs raised up -->
    <rect x="84" y="105" width="10" height="35" rx="5" fill="#8B5E3C" transform="rotate(15 84 105)" />
    <rect x="106" y="105" width="10" height="35" rx="5" fill="#8B5E3C" transform="rotate(-15 106 105)" />
    <!-- Feet up -->
    <ellipse cx="80" cy="102" rx="8" ry="5" fill="#6B4226" transform="rotate(15 80 102)" />
    <ellipse cx="120" cy="102" rx="8" ry="5" fill="#6B4226" transform="rotate(-15 120 102)" />
    <!-- Head -->
    <circle cx="100" cy="115" r="22" fill="#8B5E3C" />
    <circle cx="100" cy="117" r="14" fill="#C4956A" />
    <!-- Ears -->
    <circle cx="78" cy="107" r="9" fill="#8B5E3C" />
    <circle cx="78" cy="107" r="5" fill="#D4A574" />
    <circle cx="122" cy="107" r="9" fill="#8B5E3C" />
    <circle cx="122" cy="107" r="5" fill="#D4A574" />
    <!-- Eyes (looking at legs) -->
    <circle cx="94" cy="112" r="3" fill="#2C1810" />
    <circle cx="106" cy="112" r="3" fill="#2C1810" />
    <circle cx="94.5" cy="111" r="1" fill="white" />
    <circle cx="106.5" cy="111" r="1" fill="white" />
    <!-- Mouth (effort) -->
    <path d="M94 123 Q100 127 106 123" stroke="#2C1810" stroke-width="2" fill="none" stroke-linecap="round" />
    <!-- Sweat -->
    <path d="M125 102 Q128 96 131 102 Q128 106 125 102Z" fill="#7EC8E3" />
  </svg>
</template>
