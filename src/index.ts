import { leds, toggle } from './leds'
import { port } from './serial'
import { AddressInfo, createServer } from 'net'

let count = 0

setInterval(() => {
  for (const key in leds) {
    toggle(leds[key])
  }
  port.write(`RS 485 TEST :: ${count}`)
  count++
}, 1000)

const server = createServer(function (socket) {
  const ip = (socket.address() as AddressInfo).address.split(':').pop()

  const timer = setInterval(() => {
    socket.write(`ETHERNET TEST ${ip} :: ${count}`)
  }, 1000)

  socket.on('data', function (chunk) {
    console.log('msg from clint :: ', chunk.toString())
    socket.write(`echo by ${ip} :: ${chunk.toString()}`)
  })

  socket.on('end', function () {
    clearInterval(timer)
  })
})

server.on('listening', function () {
  console.log('Server is listening')
})

server.on('close', function () {
  console.log('Server closed')
})

server.listen(3000)
