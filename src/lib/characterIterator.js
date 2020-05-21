
export const makeCharacterIterator = (end = Infinity, collection = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']) => {
  const characters = []
  let nextIndex = 0;

  let i=0
  let depth = null
  while(characters.length < end){
    characters.push(`${depth ? depth : ''}${collection[i]}`)
    if (i + 1 < collection.length){
      i++
    } else {
      if (depth){
        depth = collection[collection.indexOf(depth) + 1]
      } else {
        depth = collection[0]
      }
      i = 0
    }
  }

  return{
    next: function() {
      let result;

      if (nextIndex < end) {
        result = { value: characters[nextIndex], done: false }
        nextIndex++;
        return result;
      }

      return { value: characters[nextIndex], done: true }
    },
    [Symbol.iterator]: function() { return this; }
  }
}

