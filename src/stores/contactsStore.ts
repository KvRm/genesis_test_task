import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createContact, getContact } from '../api/requests/contacts'
import { EntityType } from '../types/Entity'

export const useContactsStore = defineStore('constacts', () => {
  const loading = ref<boolean>(false)
  const error = ref<string>('')
  const constacts = ref<EntityType[]>([])

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
        constacts.value.push(contact)
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        error.value = e.message
      }
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = ''
  }

  return { constacts, addContact, loading, error, clearError }
})
