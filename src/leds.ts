import { Gpio } from 'onoff'

const config: { name: string; pin: number }[] = [
  //   { name: 'LED_CTL_1', pin: 36 },
  { name: 'LED_CTL_2', pin: 37 },
  { name: 'LED_GW_STATE', pin: 17 },
  { name: 'LED_LAN9512', pin: 21 },
  { name: 'LED_LAN9514', pin: 20 },
  { name: 'LED_RS485_A', pin: 22 },
  { name: 'LED_WIRELESS', pin: 25 },
]

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
