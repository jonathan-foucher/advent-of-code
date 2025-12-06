import { readFile } from '../../utils/javascript/file-utils'

const SHOP_FILE_NAME = 'input/shop.txt'
const FILE_NAME = 'input/input.txt'

let itemType
let id = 0
const SHOP = readFile(SHOP_FILE_NAME)
  .map((line) => {
    if (line === '') {
      return
    }

    const match = /^[A-Z][a-z]*(?=:)/.exec(line)
    if (match) {
      itemType = match[0].toLowerCase()
      return
    }

    const numbers = [...line.matchAll(/(?<= )\d+/g)].map((n) => parseInt(n))
    const cost = numbers[0]
    const damage = numbers[1]
    const armor = numbers[2]
    id++

    return { id, itemType, cost, damage, armor }
  })
  .filter((item) => item)

let BOSS_STATS = {}
readFile(FILE_NAME).forEach((line) => {
  const hp = /(?<=Hit Points: )\d+/.exec(line)
  const damage = /(?<=Damage: )\d+/.exec(line)
  const armor = /(?<=Armor: )\d+/.exec(line)
  if (hp) {
    BOSS_STATS.hp = parseInt(hp)
  }
  if (damage) {
    BOSS_STATS.damage = parseInt(damage)
  }
  if (armor) {
    BOSS_STATS.armor = parseInt(armor)
  }
})

const PLAYER_HP = 100

const getMinCost = (cost, damage, armor, weaponId, armorId, ringIds) => {
  const damageInput = BOSS_STATS.damage - armor > 0 ? BOSS_STATS.damage - armor : 1
  const damageOutput = damage - BOSS_STATS.armor > 0 ? damage - BOSS_STATS.armor : 1
  if (weaponId && Math.ceil(PLAYER_HP / damageInput) >= Math.ceil(BOSS_STATS.hp / damageOutput)) {
    return cost
  }

  let results = []
  if (!weaponId) {
    const items = SHOP.filter((item) => item.itemType === 'weapons')
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      results.push(getMinCost(item.cost, item.damage, item.armor, item.id, null, []))
    }
  } else {
    if (!armorId) {
      const items = SHOP.filter((item) => item.itemType === 'armor')
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        results.push(getMinCost(cost + item.cost, damage + item.damage, armor + item.armor, weaponId, item.id, ringIds))
      }
    }

    if (ringIds.length < 2) {
      const items = SHOP.filter((item) => item.itemType === 'rings' && !ringIds.includes(item.id))
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        results.push(
          getMinCost(cost + item.cost, damage + item.damage, armor + item.armor, weaponId, armorId, [
            ...ringIds,
            item.id,
          ])
        )
      }
    }
  }

  return results.length > 0 ? Math.min(...results.filter((n) => n)) : undefined
}

const result = getMinCost(0, 0, 0, 0, null, null, [])

console.log(result)
