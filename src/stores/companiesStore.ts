import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createCompany, getCompany } from '../api/requests/companies'
import { EntityType } from '../types/Entity'

export const useCompaniesStore = defineStore('company', () => {
  const loading = ref<boolean>(false)
  const error = ref<string>('')
  const companies = ref<EntityType[]>([])

  async function addCompany() {
    try {
      loading.value = true
      const newCompany = await createCompany([
        {
          name: 'Здесь должно быть имя Компании',
        },
      ])
      const newCompanyId = newCompany[0].id as string

      const company = await getCompany(newCompanyId)

      if (company) {
        companies.value.push(company)
        saveCompaniesToSessionStorage()
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        error.value = e.message
      }
    } finally {
      loading.value = false
    }
  }

  function saveCompaniesToSessionStorage() {
    window.sessionStorage.setItem('companies', JSON.stringify(companies.value))
  }

  function getCompaniesFromSessionStorage() {
    const sessionLeads = window.sessionStorage.getItem('companies')
    if (sessionLeads) [(companies.value = JSON.parse(sessionLeads))]
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
