const registers = { b: 106500, d: 0 }

let result = 0
while (true) {
  registers.d = 2

  do {
    if (registers.b % registers.d === 0) {
      result++
      break
    }
    registers.d++
  } while (registers.d !== registers.b)

  if (registers.b === 123500) {
    break
  }

  registers.b += 17
}

console.log(result)
