import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

let BOSS_STATS = {}
readFile(FILE_NAME).forEach((line) => {
  const hp = /(?<=Hit Points: )\d+/.exec(line)
  const damage = /(?<=Damage: )\d+/.exec(line)
  if (hp) {
    BOSS_STATS.hp = parseInt(hp)
  }
  if (damage) {
    BOSS_STATS.damage = parseInt(damage)
  }
})

const PLAYER_HP = 50
const PLAYER_MANA = 500
const MANA_COST_LIMIT = 1500

const getMinMana = (bossHp, hp, mana, shieldTimer, poisonTimer, rechargeTimer, manaCost) => {
  if (manaCost > MANA_COST_LIMIT) {
    return undefined
  }

  hp--
  if (hp < 0) {
    return undefined
  }

  if (shieldTimer > 0) {
    hp += BOSS_STATS.damage > 7 ? 7 : BOSS_STATS.damage - 1
    shieldTimer--
  }
  if (poisonTimer > 0) {
    bossHp -= 3
    poisonTimer--
  }
  if (rechargeTimer > 0) {
    mana += 101
    rechargeTimer--
  }

  if (bossHp <= 0) {
    return manaCost
  }

  if (manaCost > 0) {
    hp -= BOSS_STATS.damage
    if (hp < 0) {
      return undefined
    }
  }

  if (shieldTimer > 0) {
    shieldTimer--
  }
  if (poisonTimer > 0) {
    bossHp -= 3
    poisonTimer--
  }
  if (rechargeTimer > 0) {
    mana += 101
    rechargeTimer--
  }

  if (bossHp <= 0) {
    return manaCost
  }

  let results = []

  if (mana >= 53) {
    results.push(getMinMana(bossHp - 4, hp, mana - 53, shieldTimer, poisonTimer, rechargeTimer, manaCost + 53))
  }

  if (mana >= 73) {
    results.push(getMinMana(bossHp - 2, hp + 2, mana - 73, shieldTimer, poisonTimer, rechargeTimer, manaCost + 73))
  }

  if (mana >= 113 && shieldTimer === 0) {
    results.push(getMinMana(bossHp, hp, mana - 113, 6, poisonTimer, rechargeTimer, manaCost + 113))
  }

  if (mana >= 173 && poisonTimer === 0) {
    results.push(getMinMana(bossHp, hp, mana - 173, shieldTimer, 6, rechargeTimer, manaCost + 173))
  }

  if (mana >= 229 && rechargeTimer === 0) {
    results.push(getMinMana(bossHp, hp, mana - 229, shieldTimer, poisonTimer, 5, manaCost + 229))
  }

  results = results.filter((e) => e)
  return results.length > 0 ? Math.min(...results) : undefined
}

const result = getMinMana(BOSS_STATS.hp, PLAYER_HP, PLAYER_MANA, 0, 0, 0, 0)

console.log(result)
