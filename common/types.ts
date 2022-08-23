export type Timeout = {
  value: string | number | NodeJS.Timeout | undefined
}

export type ReloadTimer = {
  origin: string
  isEnabled: boolean
  isInterval: boolean
  milliseconds: number

  createdAt: string
  updatedAt: string

  timeout?: Timeout
}

export type ReloadTimers = ReloadTimer[]
