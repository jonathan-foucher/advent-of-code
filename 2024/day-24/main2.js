import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)
const Z_REGEX = /^z\d\d$/

const outputs = new Map()
const ops = new Map()
let nbGates = 0

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  if (line.includes('->')) {
    if (Z_REGEX.test(line.split(' -> ')[1])) {
      nbGates++
    }
    outputs.set(line.split(' -> ')[0], line.split(' -> ')[1])
    ops.set(line.split(' -> ')[1], line.split(' -> ')[0])
  }
}

let swaps = []

const checkBit = (counter, maxDepth, prevInputs) => {
  if (maxDepth < counter) {
    return
  }

  const cStr = ("0" + counter).slice(-2)
  const cPrevStr = ("0" + (counter - 1)).slice(-2)

  const prevCarry = outputs.get(prevInputs.join(' AND ')) || outputs.get(prevInputs.reverse().join(' AND '))

  const carry = outputs.get(`x${cPrevStr} AND y${cPrevStr}`) || outputs.get(`y${cPrevStr} AND x${cPrevStr}`)

  const nextCarry = outputs.get([prevCarry, carry].join(' OR ')) || outputs.get([carry, prevCarry].join(' OR '))

  let add = outputs.get(`x${cStr} XOR y${cStr}`) || outputs.get(`y${cStr} XOR x${cStr}`)

  let inputs = counter === 0 ? [ 'x00', 'y00' ]
    : counter === 1 ? [ add, carry ]
    : [ add, nextCarry ]
  const finalAdd = outputs.get(inputs.join(' XOR ')) || outputs.get(inputs.reverse().join(' XOR '))

  if (finalAdd && finalAdd !== `z${cStr}`) {
    const opFinalAdd = ops.get(finalAdd)
    const opZ = ops.get(`z${cStr}`)
    outputs.set(opFinalAdd, `z${cStr}`)
    outputs.set(opZ, finalAdd)

    swaps.push(finalAdd)
    swaps.push(`z${cStr}`)
  }

  if (counter !== maxDepth && !finalAdd && !ops.get(`z${cStr}`).split(' XOR ').includes(add)) {
    const zInputs = ops.get(`z${cStr}`).split(' XOR ').filter(key => key !== nextCarry)[0]
    const opAdd = ops.get(add)
    const opZ = ops.get(zInputs)
    outputs.set(opZ, add)
    outputs.set(opAdd, zInputs)

    swaps.push(add)
    swaps.push(zInputs)
    add = zInputs
    inputs = [ add, nextCarry ]
  }

  checkBit(counter + 1, maxDepth, inputs)
}

checkBit(0, nbGates - 1, [])

console.log(swaps.sort().join(','))
