/**
 *
 * @param {T[]} array
 * @param  {{ [category: string] : ((x: T) => boolean) }} predicates
 * @returns {{ [category: string] : T[] }}
 * @template T
 */
function splitSort(array, predicates) {
  const categories = Object.keys(predicates) 
  
  if (categories.length === 0) {
    return []
  }

  const result = {}
  for (const category of categories) {
    result[category] = []
  }

  for (const e of array) {
    for (const category of categories) {
      if(predicates[category](e)) {
        result[category].push(e)
      }
    }
  }

  return result
}

module.exports = splitSort
