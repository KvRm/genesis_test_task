<template>
  <BaseForm @submit="handleForm">
    <template #header>
      <div class="form-header">
        <h1 class="form-title">Создать сущность</h1>
      </div>
    </template>
    <template #main>
      <div class="form-main">
        <BaseDropdown v-model="currentEntity" :value-list="entityList" />
      </div>
    </template>
    <template #footer>
      <div class="form-footer">
        <BaseButton type="submit" :disabled="isBtnDisabled" :loading="isBtnLoading">
          Создать
        </BaseButton>
        <p class="form-error-msg">{{ errorMsg }}</p>
      </div>
    </template>
  </BaseForm>
  <p class="table-title">Контакты:</p>
  <BaseEntityTable class="entity-table" :entities="contactsStore.contacts" />

  <p class="table-title">Сделки:</p>
  <BaseEntityTable class="entity-table" :entities="leadsStore.leads" />

  <p class="table-title">Компании:</p>
  <BaseEntityTable class="entity-table" :entities="companiesStore.companies" />
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import BaseButton from '../components/BaseButton.vue'
  import BaseDropdown from '../components/BaseDropdown.vue'
  import BaseForm from '../components/BaseForm.vue'
  import BaseEntityTable from '../components/BaseEntityTable.vue'
  import { useContactsStore } from '../stores/contactsStore'
  import { EntityEnum } from '../types/Entity'
  import { useCompaniesStore } from '../stores/companiesStore'
  import { useLeadsStore } from '../stores/leadsStore'

  const contactsStore = useContactsStore()
  const companiesStore = useCompaniesStore()
  const leadsStore = useLeadsStore()

  const NOT_SELECTED_ENTITY = 'Не выбрано'
  const entityList = Array.from(Object.values(EntityEnum))

  const currentEntity = ref<string>(NOT_SELECTED_ENTITY)
  const errorMsg = computed<string>(
    () => contactsStore.error + companiesStore.error + leadsStore.error
  )
  const isBtnLoading = computed<boolean>(
    () => contactsStore.loading || companiesStore.loading || leadsStore.loading
  )
  const isBtnDisabled = computed<boolean>(
    () => currentEntity.value === NOT_SELECTED_ENTITY
  )

  onMounted(() => {
    loadAllEntitiesFromSessionStorage()
  })

  function loadAllEntitiesFromSessionStorage() {
    leadsStore.getLeadsFromSessionStorage()
    companiesStore.getCompaniesFromSessionStorage()
    contactsStore.getContactsFromSessionStorage()
  }

  function cleatAllErrors() {
    contactsStore.clearError()
    companiesStore.clearError()
    leadsStore.clearError()
  }

  async function handleForm() {
    if (isBtnDisabled.value || isBtnLoading.value) return

    cleatAllErrors()

    switch (currentEntity.value) {
      case EntityEnum.Contact: {
        contactsStore.addContact()
        break
      }
      case EntityEnum.Company: {
        companiesStore.addCompany()
        break
      }
      case EntityEnum.Lead: {
        leadsStore.addLead()
        break
      }
    }
  }
</script>

<style scoped lang="scss">
  .form-header {
    text-align: center;
    .form-title {
      margin-bottom: 1rem;
      font-weight: bold;
      font-size: 1.25rem;
    }
  }
  .form-main {
    margin-bottom: 2rem;
  }
  .form-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    .form-error-msg {
      color: red;
    }
  }
  .table-title {
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  .entity-table {
    margin-bottom: 4rem;
  }
</style>
