import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const NUMBER_OF_RECIPES = parseInt(readFile(FILE_NAME)[0])
const recipes = [3, 7]
let cursor1 = 0
let cursor2 = 1

while (recipes.length < NUMBER_OF_RECIPES + 10) {
  const score = recipes[cursor1] + recipes[cursor2]
  const newRecipes = `${score}`.split('').map((char) => parseInt(char))
  for (const newRecipe of newRecipes) {
    if (recipes.length < NUMBER_OF_RECIPES + 10) {
      recipes.push(newRecipe)
    }
  }
  cursor1 = (cursor1 + 1 + recipes[cursor1]) % recipes.length
  cursor2 = (cursor2 + 1 + recipes[cursor2]) % recipes.length
}

const result = recipes.slice(recipes.length - 10).join('')
console.log(result)
