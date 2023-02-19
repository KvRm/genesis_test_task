import { EntityPostRequest, EntityType } from '../../types/Entity'
import { http } from '../axios'

export async function createCompany(payload: EntityPostRequest) {
  const response = await http.post('api/v4/companies', payload)
  return response.data._embedded.companies
}
