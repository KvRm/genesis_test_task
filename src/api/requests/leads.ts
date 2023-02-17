import { EntityType } from '../../types/Entity'
import { LeadResponse } from '../../types/LeadResponse'
import { http } from '../axios'

export async function createLead(payload: unknown) {
  try {
    const response = await http.post('api/v4/leads', payload)
    return response.data._embedded.leads
  } catch (e) {
    console.log(e)
  }
}

export async function getLead(leadId: string): Promise<EntityType | undefined> {
  try {
    const response = await http.get<LeadResponse>(`/api/v4/leads/${leadId}`)
    return { id: leadId, name: response.data.name }
  } catch (e) {
    console.log(e)
  }
}
