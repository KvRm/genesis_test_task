import { ContactResponse } from '../../types/ContactResponse'
import { EntityType } from '../../types/Entity'
import { http } from '../axios'

export async function createContact(payload: unknown) {
  try {
    const response = await http.post('/api/v4/contacts', payload)
    return response.data._embedded.contacts
  } catch (e) {
    console.log(e)
  }
}

export async function getContact(contactId: string): Promise<EntityType | undefined> {
  try {
    const response = await http.get<ContactResponse>(`/api/v4/contacts/${contactId}`)
    return { id: contactId, name: response.data.name }
  } catch (e) {
    console.log(e)
  }
}
