import SerialPort from 'serialport'
import { ts_ec_3000 } from './config'

const port: SerialPort = new SerialPort(ts_ec_3000.rs485, {
  baudRate: 9600,
})

port.on('data', function (data) {
  console.log('Data:', data.toString())

  port.write(`echo by RS485 :: ${data.toString()}\n`)
})

export { port }
