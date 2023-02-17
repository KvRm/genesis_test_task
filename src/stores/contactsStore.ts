import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createContact, getContact } from '../api/requests/contacts'
import { EntityType } from '../types/Entity'

export const useContactsStore = defineStore('constacts', () => {
  const loading = ref<boolean>(false)
  const error = ref<string>('')
  const contacts = ref<EntityType[]>([])

  async function addContact() {
    try {
      loading.value = true
      const newContact = await createContact([
        {
          name: 'Здесь должно быть имя Контакта',
        },
      ])

      const newContactId = newContact[0].id as string

      const contact = await getContact(newContactId)

      if (contact) {
        contacts.value.push(contact)
        saveContactsToSessionStorage()
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        error.value = e.message
      }
    } finally {
      loading.value = false
    }
  }

  function saveContactsToSessionStorage() {
    window.sessionStorage.setItem('contacts', JSON.stringify(contacts.value))
  }

  function getContactsFromSessionStorage() {
    const sessionLeads = window.sessionStorage.getItem('contacts')
    if (sessionLeads) [(contacts.value = JSON.parse(sessionLeads))]
  }

  function clearError() {
    error.value = ''
  }

  return {
    contacts,
    addContact,
    loading,
    error,
    clearError,
    getContactsFromSessionStorage,
  }
})
