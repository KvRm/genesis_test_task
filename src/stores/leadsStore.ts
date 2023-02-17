import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createLead, getLead } from '../api/requests/leads'
import { EntityType } from '../types/Entity'

export const useLeadsStore = defineStore('leads', () => {
  const loading = ref<boolean>(false)
  const error = ref<string>('')
  const leads = ref<EntityType[]>([])

  async function addLead() {
    try {
      loading.value = true
      const newLead = await createLead([
        {
          name: 'Здесь должно быть имя Сделки',
        },
      ])

      const newContactId = newLead[0].id as string

      const contact = await getLead(newContactId)

      if (contact) {
        leads.value.push(contact)
        saveLeadsToSessionStorage()
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        error.value = e.message
      }
    } finally {
      loading.value = false
    }
  }

  function saveLeadsToSessionStorage() {
    window.sessionStorage.setItem('leads', JSON.stringify(leads.value))
  }

  function getLeadsFromSessionStorage() {
    const sessionLeads = window.sessionStorage.getItem('leads')
    if (sessionLeads) [(leads.value = JSON.parse(sessionLeads))]
  }

  function clearError() {
    error.value = ''
  }

  return { leads, addLead, loading, error, clearError, getLeadsFromSessionStorage }
})
