<template>
  <svg
    id="loader"
    class="loader"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    :style="{ stroke: color }"
  >
    <g>
      <ellipse id="ellipse" cx="50" cy="50" rx="25" ry="25" />
    </g>
  </svg>
</template>

<script setup lang="ts">
  const props = defineProps<{
    color: string
  }>()
</script>

<style scoped lang="scss">
  .loader {
    width: 100%;
    height: 100%;

    stroke-width: 8px;
    fill: transparent;

    stroke-dasharray: 157.1;
    stroke-dashoffset: 0px;

    animation: rot 2.5s infinite linear;
  }

  @keyframes rot {
    0% {
      transform: rotate(0deg);
      stroke-dashoffset: 157.1;
    }

    50% {
      stroke-dashoffset: 0;
    }

    100% {
      transform: rotate(360deg);
      stroke-dashoffset: -157.1;
    }
  }
</style>
