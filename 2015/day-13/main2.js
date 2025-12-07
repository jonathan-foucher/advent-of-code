import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const scores = new Map()
const persons = []

readFile(FILE_NAME).forEach((line) => {
  const temp = line.split(' happiness units by sitting next to ')[0].split(/ would (lose|gain) /)
  const person = temp[0]
  const score = temp[1] === 'gain' ? parseInt(temp[2]) : -parseInt(temp[2])
  const otherPerson = line.split(' happiness units by sitting next to ')[1].replace('.', '')

  scores.set(`${person}-${otherPerson}`, score)

  if (!persons.includes(person)) {
    persons.push(person)
  }
})

persons.forEach((person) => {
  scores.set(`you-${person}`, 0)
  scores.set(`${person}-you`, 0)
})
persons.push('you')

const getBiggerScore = (persons, prevPerson, firstPerson) => {
  if (persons.length === 0) {
    return scores.get(`${prevPerson}-${firstPerson}`) + scores.get(`${firstPerson}-${prevPerson}`)
  }

  return persons
    .map((person) => {
      const score =
        prevPerson !== null ? scores.get(`${prevPerson}-${person}`) + scores.get(`${person}-${prevPerson}`) : 0
      return (
        getBiggerScore(
          persons.filter((p) => p !== person),
          person,
          prevPerson === null ? person : firstPerson
        ) + score
      )
    })
    .reduce((acc, val) => {
      if (val > acc) {
        acc = val
      }
      return acc
    }, 0)
}

const result = getBiggerScore(persons, null, null)
console.log(result)
