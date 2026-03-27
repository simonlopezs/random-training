<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
    <!-- Shadow -->
    <ellipse cx="100" cy="188" rx="30" ry="6" fill="#e0d5c8" opacity="0.5" />
    <!-- Body (jumping up) -->
    <ellipse cx="100" cy="120" rx="28" ry="24" fill="#8B5E3C" />
    <ellipse cx="100" cy="122" rx="20" ry="17" fill="#C4956A" />
    <!-- Arms up (V shape) -->
    <rect x="68" y="80" width="10" height="30" rx="5" fill="#8B5E3C" transform="rotate(20 68 80)" />
    <rect x="122" y="80" width="10" height="30" rx="5" fill="#8B5E3C" transform="rotate(-20 122 80)" />
    <!-- Hands up -->
    <circle cx="62" cy="78" r="6" fill="#6B4226" />
    <circle cx="138" cy="78" r="6" fill="#6B4226" />
    <!-- Legs spread -->
    <rect x="82" y="140" width="10" height="28" rx="5" fill="#8B5E3C" transform="rotate(10 82 140)" />
    <rect x="108" y="140" width="10" height="28" rx="5" fill="#8B5E3C" transform="rotate(-10 108 140)" />
    <!-- Feet -->
    <ellipse cx="78" cy="172" rx="9" ry="5" fill="#6B4226" />
    <ellipse cx="122" cy="172" rx="9" ry="5" fill="#6B4226" />
    <!-- Head -->
    <circle cx="100" cy="75" r="26" fill="#8B5E3C" />
    <circle cx="100" cy="78" r="17" fill="#C4956A" />
    <!-- Ears -->
    <circle cx="74" cy="65" r="10" fill="#8B5E3C" />
    <circle cx="74" cy="65" r="6" fill="#D4A574" />
    <circle cx="126" cy="65" r="10" fill="#8B5E3C" />
    <circle cx="126" cy="65" r="6" fill="#D4A574" />
    <!-- Eyes (excited) -->
    <circle cx="92" cy="73" r="4" fill="#2C1810" />
    <circle cx="108" cy="73" r="4" fill="#2C1810" />
    <circle cx="93" cy="72" r="1.5" fill="white" />
    <circle cx="109" cy="72" r="1.5" fill="white" />
    <!-- Big smile -->
    <path d="M90 85 Q100 94 110 85" stroke="#2C1810" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <!-- Motion lines -->
    <line x1="55" y1="95" x2="45" y2="90" stroke="#ccc" stroke-width="2" stroke-linecap="round" />
    <line x1="55" y1="105" x2="42" y2="105" stroke="#ccc" stroke-width="2" stroke-linecap="round" />
    <line x1="145" y1="95" x2="155" y2="90" stroke="#ccc" stroke-width="2" stroke-linecap="round" />
    <line x1="145" y1="105" x2="158" y2="105" stroke="#ccc" stroke-width="2" stroke-linecap="round" />
  </svg>
</template>
