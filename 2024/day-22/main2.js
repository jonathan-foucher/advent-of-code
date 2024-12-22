import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const N_ITERATIONS = 2000

const xor = (n2, n1) => {
  const shift = 2 ** 31
  const n1h = Math.trunc(n1 / shift)
  const n2h = Math.trunc(n2 / shift)
  const n1l = n1 % shift
  const n2l = n2 % shift
  return shift * new Number(n1h ^ n2h) + new Number(n1l ^ n2l)
}

const secrets = readFile(FILE_NAME)
  .map(line => parseInt(line))

let prices = []
for (let i = 0; i < N_ITERATIONS; i++) {
  for (let j = 0; j < secrets.length; j++) {
    if (i === 0) {
      prices.push([])
    }

    let secret = secrets[j]
    secret = xor((secret * 64), secret) % 16777216
    secret = xor((secret / 32), secret) % 16777216
    secret = xor((secret * 2048), secret) % 16777216
    secrets[j] = secret

    let seq = []
    if (i >= 4) {
      for (let k = -3; k < 0; k++) {
        seq.push(prices[j][i + k].delta)
      }
    }

    const price = secret % 10
    const delta = i > 0 ? price - prices[j][i - 1].price : undefined
    prices[j].push({
      price,
      delta,
      buyer: j,
      seq: i >= 4 ? `${seq.join(',')},${delta}` : ''
    })
  }
}

const flatPrices = prices.flatMap(price => price).filter(price => price.seq !== '')
const groupedPrices = new Map()
for (let i = 0; i < flatPrices.length; i++) {
  const current = flatPrices[i]
  const foundGroupedPrice = groupedPrices.get(current.seq)

  if (!foundGroupedPrice) {
    groupedPrices.set(current.seq, { price: current.price, buyers: [ current.buyer ] })
  } else if (!foundGroupedPrice.buyers.includes(current.buyer)) {
    foundGroupedPrice.price += current.price
    foundGroupedPrice.buyers.push(current.buyer)
  }
}

let bestSeq = ''
const groupedPricesArray = Array.from(groupedPrices.entries())
let bestPrice = 0
for (let i = 0; i < groupedPricesArray.length; i++) {
  const currentPrice = groupedPricesArray[i][1].price
  const currentSeq = groupedPricesArray[i][0]
  if (bestPrice < currentPrice) {
    bestSeq = currentSeq
    bestPrice = currentPrice
  }
}

console.log(bestSeq, bestPrice)
