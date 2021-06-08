import { Gpio } from 'onoff'
import { ts_ec_3000 } from './config'

const config = ts_ec_3000.leds

const leds: { [name: string]: any } = {}

config.forEach((config) => {
  const { name, pin } = config
  leds[name] = new Gpio(pin, 'out')
})

function set(led: Gpio, state: 0 | 1): void
function set(led: Gpio, state: boolean): void
function set(led: Gpio, state: boolean | (0 | 1)): void {
  if (typeof state === 'boolean') state = state ? 1 : 0
  led.writeSync(state)
}

async function get(led: Gpio) {
  return await led.read()
}

async function toggle(led: Gpio) {
  const prevState = await get(led)
  set(led, !prevState)
}

export { leds, get, set, toggle }
