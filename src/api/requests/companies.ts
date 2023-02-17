import { CompanyResponse } from '../../types/CompanyResponse'
import { EntityPostRequest, EntityType } from '../../types/Entity'
import { http } from '../axios'

export async function createCompany(payload: EntityPostRequest) {
  const response = await http.post('api/v4/companies', payload)
  return response.data._embedded.companies
}

export async function getCompany(contactId: string): Promise<EntityType | undefined> {
  const response = await http.get<CompanyResponse>(`/api/v4/companies/${contactId}`)
  return { id: contactId, name: response.data.name }
}
