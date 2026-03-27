<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
    <!-- Shadow -->
    <ellipse cx="100" cy="188" rx="45" ry="6" fill="#e0d5c8" opacity="0.5" />
    <!-- Body upright -->
    <ellipse cx="95" cy="120" rx="26" ry="24" fill="#8B5E3C" />
    <ellipse cx="95" cy="122" rx="18" ry="17" fill="#C4956A" />
    <!-- Front leg (bent, lunging) -->
    <rect x="75" y="140" width="10" height="22" rx="5" fill="#8B5E3C" transform="rotate(5 75 140)" />
    <rect x="70" y="158" width="10" height="20" rx="5" fill="#8B5E3C" transform="rotate(-40 70 158)" />
    <ellipse cx="62" cy="176" rx="9" ry="5" fill="#6B4226" />
    <!-- Back leg (extended) -->
    <rect x="105" y="140" width="10" height="25" rx="5" fill="#8B5E3C" transform="rotate(-25 105 140)" />
    <rect x="118" y="158" width="10" height="20" rx="5" fill="#8B5E3C" transform="rotate(-60 118 158)" />
    <ellipse cx="135" cy="176" rx="9" ry="5" fill="#6B4226" />
    <!-- Arms on hips -->
    <path d="M72 115 Q60 120 65 130" stroke="#8B5E3C" stroke-width="9" fill="none" stroke-linecap="round" />
    <path d="M118 115 Q130 120 125 130" stroke="#8B5E3C" stroke-width="9" fill="none" stroke-linecap="round" />
    <circle cx="65" cy="132" r="5" fill="#6B4226" />
    <circle cx="125" cy="132" r="5" fill="#6B4226" />
    <!-- Head -->
    <circle cx="95" cy="72" r="26" fill="#8B5E3C" />
    <circle cx="95" cy="75" r="17" fill="#C4956A" />
    <!-- Ears -->
    <circle cx="69" cy="62" r="10" fill="#8B5E3C" />
    <circle cx="69" cy="62" r="6" fill="#D4A574" />
    <circle cx="121" cy="62" r="10" fill="#8B5E3C" />
    <circle cx="121" cy="62" r="6" fill="#D4A574" />
    <!-- Eyes (focused) -->
    <circle cx="88" cy="70" r="3.5" fill="#2C1810" />
    <circle cx="102" cy="70" r="3.5" fill="#2C1810" />
    <circle cx="88.5" cy="69" r="1.2" fill="white" />
    <circle cx="102.5" cy="69" r="1.2" fill="white" />
    <!-- Mouth -->
    <path d="M88 82 Q95 87 102 82" stroke="#2C1810" stroke-width="2" fill="none" stroke-linecap="round" />
  </svg>
</template>
