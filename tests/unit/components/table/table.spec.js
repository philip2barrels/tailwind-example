import { shallowMount } from '@vue/test-utils'
import Table from '@/components/Table.vue'

//A table should have a datasource attribute
//A table should have a delegate attribute
//A table should have sortable columns
//A table should render each item with data attributes to access individually by row and column a-z/1-

const datasources = {
  empty: [],
  one: [
    {
      id: 1,
      first_name: "Joe",
      last_name: "Dirt",
      email: "dirtyjoe@gmail.com"
    }
  ]
}

const delegates = {
  undefined: undefined,
  showFirstName: {
    headers: [
      {
        key: 'first_name',
        label: 'First'
      }
    ]
  }
}

const configuration = (datasource, delegate) => {
  return {
    datasource: datasources[datasource],
    delegate: delegates[delegate]
  }
}

describe('@Table.delegate', () => {
  it('does nothing when the datasource is an empty array or null', () => {
    const data = configuration('one','empty')
    const wrapper = shallowMount(Table, () => data)
    const vm = wrapper.vm

  })
  it('presents', () => {
    const data = {
      datasource: datasources.one,
      delegate: delegates.one
    }
    const wrapper = shallowMount(Table, () => data)

    expect(wrapper.html()).toEqual({})
  })
})
