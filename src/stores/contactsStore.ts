import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createContact } from '../api/requests/contacts'
import { useTypeChecker } from '../lib/useTypeChecker'
import { EntityType } from '../types/Entity'

export const useContactsStore = defineStore('constacts', () => {
  const { isEntityType } = useTypeChecker()

  const loading = ref<boolean>(false)
  const error = ref<string>('')
  const contacts = ref<EntityType[]>([])

  async function addContact(name: string) {
    try {
      loading.value = true
      const newContact = await createContact([{ name }])
      const newContactId = newContact[0].id as string

      contacts.value.push({ id: newContactId, name })
      saveContactsToSessionStorage()
    } catch (e) {
      error.value = 'Не удалось создать Контакт'
    } finally {
      loading.value = false
    }
  }

  function saveContactsToSessionStorage() {
    window.sessionStorage.setItem('contacts', JSON.stringify(contacts.value))
  }

  function getContactsFromSessionStorage() {
    const sessionContacts = window.sessionStorage.getItem('contacts')
    if (sessionContacts && isEntityType(JSON.parse(sessionContacts)?.[0])) {
      contacts.value = JSON.parse(sessionContacts)
    }
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
