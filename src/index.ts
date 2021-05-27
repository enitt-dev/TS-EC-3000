import { leds, toggle } from './leds'

setInterval(() => {
  for (const key in leds) {
    toggle(leds[key])
  }
}, 1000)

console.log('Hello World1')
