import { EntityPostRequest, EntityType } from '../../types/Entity'
import { http } from '../axios'

export async function createContact(payload: EntityPostRequest) {
  const response = await http.post('/api/v4/contacts', payload)
  return response.data._embedded.contacts
}
