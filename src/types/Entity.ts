export enum EntityEnum {
  Lead = 'Сделка',
  Contact = 'Контакт',
  Company = 'Компания',
}

export interface EntityType {
  id: string
  name: string
}
