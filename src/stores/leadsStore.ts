import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createLead } from '../api/requests/leads'
import { useTypeChecker } from '../lib/useTypeChecker'
import { EntityType } from '../types/Entity'

export const useLeadsStore = defineStore('leads', () => {
  const { isEntityType } = useTypeChecker()

  const loading = ref<boolean>(false)
  const error = ref<string>('')
  const leads = ref<EntityType[]>([])

  async function addLead(name: string) {
    try {
      loading.value = true
      const newLead = await createLead([{ name }])
      const newLeadId = newLead[0].id as string

      leads.value.push({ id: newLeadId, name })
      saveLeadsToSessionStorage()
    } catch (e) {
      error.value = 'Не удалось создать Сделку'
    } finally {
      loading.value = false
    }
  }

  function saveLeadsToSessionStorage() {
    window.sessionStorage.setItem('leads', JSON.stringify(leads.value))
  }

  function getLeadsFromSessionStorage() {
    const sessionLeads = window.sessionStorage.getItem('leads')
    if (sessionLeads && isEntityType(JSON.parse(sessionLeads)?.[0])) {
      leads.value = JSON.parse(sessionLeads)
    }
  }

  function clearError() {
    error.value = ''
  }

  return { leads, addLead, loading, error, clearError, getLeadsFromSessionStorage }
})
