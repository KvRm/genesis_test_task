export interface Toast {
  id: number
  message: string
  type: ToastType
}

export type ToastType = 'warn' | 'success'
