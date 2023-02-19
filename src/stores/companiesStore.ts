import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createCompany } from '../api/requests/companies'
import { useTypeChecker } from '../lib/useTypeChecker'
import { EntityType } from '../types/Entity'

export const useCompaniesStore = defineStore('company', () => {
  const { isEntityType } = useTypeChecker()

  const loading = ref<boolean>(false)
  const error = ref<string>('')
  const companies = ref<EntityType[]>([])

  async function addCompany(name: string) {
    try {
      loading.value = true
      const newCompany = await createCompany([{ name }])
      const newCompanyId = newCompany[0].id as string

      companies.value.push({ id: newCompanyId, name })
      saveCompaniesToSessionStorage()
    } catch (e) {
      error.value = 'Не удалось создать Компанию'
    } finally {
      loading.value = false
    }
  }

  function saveCompaniesToSessionStorage() {
    window.sessionStorage.setItem('companies', JSON.stringify(companies.value))
  }

  function getCompaniesFromSessionStorage() {
    const sessionCompanies = window.sessionStorage.getItem('companies')
    if (sessionCompanies && isEntityType(JSON.parse(sessionCompanies)?.[0])) {
      companies.value = JSON.parse(sessionCompanies)
    }
  }

  function clearError() {
    error.value = ''
  }

  return {
    companies,
    addCompany,
    loading,
    error,
    clearError,
    getCompaniesFromSessionStorage,
  }
})
