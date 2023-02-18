<template>
  <button
    class="base-btn"
    :type="type || 'button'"
    :class="{ 'base-btn-disabled': disabled, 'base-btn-active': !disabled }"
    tabindex="1"
    :disabled="disabled"
  >
    <div class="base-btn-content" v-if="!loading">
      <slot />
    </div>
    <BasePreloaderVue v-else class="base-btn-loader" color="white" />
  </button>
</template>

<script setup lang="ts">
  import BasePreloaderVue from './BasePreloader.vue'

  const props = defineProps<{
    disabled?: boolean
    loading?: boolean
    type?: 'button' | 'reset' | 'submit'
  }>()
</script>

<style scoped lang="scss">
  .base-btn {
    border: 1px solid var(--text-color-gray);
    box-shadow: 0 0 2px var(--text-color-gray);
    border-radius: 0.2rem;
    font-weight: bold;
    transition: all 0.3s;
    .base-btn-content {
      color: #fff;
      padding: 0.5rem 1rem;
    }
    .base-btn-loader {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
  .base-btn-active {
    background: var(--color-primary);
    color: #fff;
    &:hover {
      background: #0c38bc;
    }
  }
  .base-btn-disabled {
    background: #fff;
    cursor: no-drop;
    &:hover {
      background: #fff;
    }
    .base-btn-content {
      color: var(--text-color-primary);
    }
  }
</style>
