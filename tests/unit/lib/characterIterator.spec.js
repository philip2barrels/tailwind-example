import {makeCharacterIterator} from '@/lib/characterIterator'

describe('', () => {

  it('should loop when the end is longer than the character list', function () {

    const subject = makeCharacterIterator(800)
    let last = null
    
    for(const item of subject){
      last = item
    }
    expect(last).toBe('aa')

  })

})
