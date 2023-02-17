import { ContactResponse } from '../../types/ContactResponse'
import { EntityPostRequest, EntityType } from '../../types/Entity'
import { http } from '../axios'

export async function createContact(payload: EntityPostRequest) {
  const response = await http.post('/api/v4/contacts', payload)
  return response.data._embedded.contacts
}

export async function getContact(contactId: string): Promise<EntityType | undefined> {
  const response = await http.get<ContactResponse>(`/api/v4/contacts/${contactId}`)
  return { id: contactId, name: response.data.name }
}
