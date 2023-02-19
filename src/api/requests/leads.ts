import { EntityPostRequest, EntityType } from '../../types/Entity'
import { http } from '../axios'

export async function createLead(payload: EntityPostRequest) {
  const response = await http.post('api/v4/leads', payload)
  return response.data._embedded.leads
}
