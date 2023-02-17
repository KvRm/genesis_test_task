<template>
  <div class="base-dropdown" ref="dropdown">
    <button
      class="base-dropdown-toggle"
      @click="isDropdownActive = !isDropdownActive"
      tabindex="1"
    >
      {{ modelValue }}
      <FontAwesomeIcon
        :icon="`fa-solid fa-chevron-down`"
        class="icon"
        :style="{
          rotate: `${btnIconRotate}deg`,
        }"
      />
    </button>
    <ul
      v-if="isDropdownActive"
      class="base-dropdown-list"
      :style="{
        width: `${dropdownWidth}px`,
      }"
    >
      <li
        v-for="item in valueList"
        class="base-dropdown-list-item"
        :class="{ 'active-item': isItemActive(item) }"
        tabindex="1"
        @click="handleItemClick(item)"
      >
        {{ item }}
        <FontAwesomeIcon v-if="isItemActive(item)" icon="fa-solid fa-check" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
  import { useClickOutside } from '../composables/useClickOutside'

  const props = defineProps<{
    modelValue: string
    valueList: string[]
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const dropdown = ref<HTMLElement | null>(null)
  const isDropdownActive = ref<boolean>(false)
  const btnIconRotate = computed<number>(() => (isDropdownActive.value ? 180 : 0))
  const dropdownWidth = ref<string | number>('auto')

  onMounted(() => {
    if (dropdown.value) {
      useClickOutside(dropdown, () => (isDropdownActive.value = false))
    }

    window.addEventListener('resize', rewriteWidth)

    rewriteWidth()
  })

  onUnmounted(() => {
    window.addEventListener('resize', rewriteWidth)
  })

  function rewriteWidth() {
    if (dropdown.value) {
      dropdownWidth.value = dropdown.value?.clientWidth
    }
  }

  function isItemActive(item: string) {
    if (props.modelValue === item) return true
    return false
  }

  function handleItemClick(item: string) {
    emit('update:modelValue', item)
    isDropdownActive.value = false
  }
</script>

<style scoped lang="scss">
  .base-dropdown {
    .base-dropdown-toggle {
      display: flex;
      justify-content: space-between;
      width: 100%;
      min-height: 32px;
      text-align: start;
      padding: 0.5rem;
      color: var(--text-color-primary);
      border: 1px solid var(--text-color-gray);
      box-shadow: 0 0 2px var(--text-color-gray);
      border-radius: 0.2rem;
      .icon {
        transition: all 0.1s ease;
      }
    }
    .base-dropdown-list {
      position: fixed;
      margin-top: 0.3rem;
      background: #fff;
      border: 1px solid var(--text-color-gray);
      box-shadow: 0 0 2px var(--text-color-gray);
      border-radius: 0.2rem;
      .base-dropdown-list-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        cursor: pointer;
        &:hover,
        &:active,
        &:focus {
          background: var(--color-gray);
        }
      }
    }
  }
</style>
