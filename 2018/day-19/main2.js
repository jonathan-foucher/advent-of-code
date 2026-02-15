const b = 2 * 2 * 19 * 11 + 7 * 22 + 8 + (27 * 28 + 29) * 30 * 14 * 32

let e = 1
let result = 0
do {
  if (b % e === 0) {
    result += e
  }
  e += 1
} while (e <= b)

console.log(result)
