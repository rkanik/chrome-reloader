import { Storage } from './storage'
import { RELOAD_TIMER_KEY } from './consts'
import { ReloadTimer, ReloadTimers } from './types'

export const getReloadTimers = async () => {
  return (await Storage.get<ReloadTimers>(RELOAD_TIMER_KEY, [])) || []
}

export const getReloadTimer = async (
  origin: string,
  storageTimes?: ReloadTimers
) => {
  const timers = storageTimes || (await getReloadTimers())
  return timers.find((timer) => timer.origin === origin)
}

export const setReloadTimer = async (timer: ReloadTimer) => {
  const timers = await getReloadTimers()
  const index = timers.findIndex((v) => {
    return v.origin === timer.origin
  })

  if (index === -1) timers.push(timer)
  else timers.splice(index, 1, timer)

  return Storage.set(RELOAD_TIMER_KEY, timers)
}
