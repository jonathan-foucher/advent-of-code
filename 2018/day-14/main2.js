import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const SEARCHED_PATTERN = readFile(FILE_NAME)[0]
const recipes = [3, 7]
let cursor1 = 0
let cursor2 = 1

let search = []
mainloop: while (true) {
  const score = recipes[cursor1] + recipes[cursor2]
  const newRecipes = `${score}`.split('').map((char) => parseInt(char))
  for (const newRecipe of newRecipes) {
    recipes.push(newRecipe)

    if (search.length < SEARCHED_PATTERN.length) {
      search.push(newRecipe)
    } else {
      search.shift()
      search.push(newRecipe)
      if (search.join('') === SEARCHED_PATTERN) {
        break mainloop
      }
    }
  }
  cursor1 = (cursor1 + 1 + recipes[cursor1]) % recipes.length
  cursor2 = (cursor2 + 1 + recipes[cursor2]) % recipes.length
}

const result = recipes.length - SEARCHED_PATTERN.length
console.log(result)
