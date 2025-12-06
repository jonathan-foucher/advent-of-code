import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const distances = new Map()
const cities = []

readFile(FILE_NAME).forEach((str) => {
  const city1 = str.split(' = ')[0].split(' to ')[0]
  const city2 = str.split(' = ')[0].split(' to ')[1]
  const distance = parseInt(str.split(' = ')[1])

  distances.set(`${city1}-${city2}`, distance)
  distances.set(`${city2}-${city1}`, distance)

  if (!cities.includes(city1)) {
    cities.push(city1)
  }
  if (!cities.includes(city2)) {
    cities.push(city2)
  }
})

const getShortestDistance = (cities, prevCity) => {
  if (cities.length === 0) {
    return 0
  }

  return cities
    .map((city) => {
      const distance = prevCity !== null ? distances.get(`${prevCity}-${city}`) : 0
      return (
        getShortestDistance(
          cities.filter((c) => c !== city),
          city
        ) + distance
      )
    })
    .reduce((acc, val) => {
      if (!acc || val < acc) {
        acc = val
      }
      return acc
    }, null)
}

const result = getShortestDistance(cities, null)

console.log(result)
