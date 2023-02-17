<template>
  <table class="base-table">
    <thead class="header">
      <tr>
        <th>Идентификатор</th>
        <th>Имя</th>
      </tr>
    </thead>
    <tbody class="body">
      <tr v-for="entity in entities" :key="entity.id" class="table-row">
        <td class="table-item">{{ entity.id }}</td>
        <td class="table-item">{{ entity.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import { EntityType } from '../types/Entity'

  const props = defineProps<{
    entities: EntityType[]
  }>()
</script>

<style scoped lang="scss">
  .base-table {
    table-layout: fixed;
    width: 100%;
    .header {
      border: 1px solid var(--text-color-gray);
      box-shadow: 0 0 2px var(--text-color-gray);
      border-radius: 0.2rem;
      th {
        padding: 0.5rem;
      }
      .header-content {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem;
        padding-bottom: 0.75rem;
      }
    }
    .body {
      text-align: center;
      .table-row {
        border: 1px solid var(--text-color-gray);
        border-top: none;
        .table-item {
          padding: 0.5rem;
        }
      }
    }
  }
</style>
