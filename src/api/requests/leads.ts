import { EntityPostRequest, EntityType } from '../../types/Entity'
import { LeadResponse } from '../../types/LeadResponse'
import { http } from '../axios'

export async function createLead(payload: EntityPostRequest) {
  const response = await http.post('api/v4/leads', payload)
  return response.data._embedded.leads
}

export async function getLead(leadId: string): Promise<EntityType | undefined> {
  const response = await http.get<LeadResponse>(`/api/v4/leads/${leadId}`)
  return { id: leadId, name: response.data.name }
}
