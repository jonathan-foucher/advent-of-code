export const xor = (n2, n1) => {
  const shift = 2 ** 31
  const n1h = Math.trunc(n1 / shift)
  const n2h = Math.trunc(n2 / shift)
  const n1l = n1 % shift
  const n2l = n2 % shift
  return shift * new Number(n1h ^ n2h) + new Number(n1l ^ n2l)
}
