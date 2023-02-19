import { EntityType } from '../types/Entity'

export const useTypeChecker = () => {
  const isEntityType = (value: unknown): value is EntityType =>
    !!((value as EntityType)?.id && (value as EntityType)?.name)

  return { isEntityType }
}
