import { CompanyResponse } from '../../types/CompanyResponse'
import { EntityType } from '../../types/Entity'
import { http } from '../axios'

export async function createCompany(payload: unknown) {
  try {
    const response = await http.post('api/v4/companies', payload)
    return response.data._embedded.companies
  } catch (e) {
    console.log(e)
  }
}

export async function getCompany(contactId: string): Promise<EntityType | undefined> {
  try {
    const response = await http.get<CompanyResponse>(`/api/v4/companies/${contactId}`)
    return { id: contactId, name: response.data.name }
  } catch (e) {
    console.log(e)
  }
}
