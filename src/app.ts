import type { ReloadTimer, ReloadTimers, Timeout } from '@@/types'

import { has } from 'lodash'
import { getReloadTimer, Storage, RELOAD_TIMER_KEY } from '../common'

const main = async () => {
  const onLocationReload = () => {
    return location.reload()
  }

  const onClearTimeout = (timeout: Timeout) => {
    if (!timeout.value) return
    clearTimeout(timeout.value)
    timeout.value = undefined
  }

  const onChangeTimer = (
    updatedTimer: ReloadTimer,
    timer: Partial<ReloadTimer> = {}
  ) => {
    const newTimer = { ...timer, ...updatedTimer }
    return onSetTimeout(newTimer)
  }

  const onSetTimeout = (timer: ReloadTimer) => {
    if (timer.timeout) onClearTimeout(timer.timeout)
    else timer.timeout = { value: 0 }

    console.log('Setting timeout for', timer.milliseconds / 1000, ' seconds')
    timer.timeout.value = setTimeout(onLocationReload, timer.milliseconds)
  }

  // let currentTimerTimeout = null
  let currentTimer = await getReloadTimer(location.origin)
  if (currentTimer) onSetTimeout(currentTimer)

  Storage.onChanged(async (storage) => {
    if (!has(storage, RELOAD_TIMER_KEY)) return

    // Updated reload timers
    const updatedTimers = (storage[RELOAD_TIMER_KEY]?.newValue ??
      []) as ReloadTimers

    // Get current tab reload timer
    let updatedTimer = await getReloadTimer(location.origin, updatedTimers)
    if (updatedTimer) onChangeTimer(updatedTimer, currentTimer)
  })
}

main()
