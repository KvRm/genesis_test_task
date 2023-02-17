import { onUnmounted, Ref } from 'vue'

/**
 * Вызывать при маунте странице
 * @example onMounted(() => useClickOutside(el, cb()))
 * @param element На какой элемент накидывается слушатель
 * @param cb Функция, выполняющаяся при клике не на элемент
 */
export const useClickOutside = (
  element: Ref<HTMLElement | null>,
  cb: VoidFunction
): void => {
  function stopPropagination(ev: MouseEvent) {
    ev.stopPropagation()
  }

  if (element.value instanceof HTMLElement)
    element.value.addEventListener('click', stopPropagination)

  window.addEventListener('click', cb)

  onUnmounted(() => {
    if (element.value instanceof HTMLElement)
      element.value.removeEventListener('click', stopPropagination)
    window.removeEventListener('click', cb)
  })
}
