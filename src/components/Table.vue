<template>
  <table class="min-w-full table">
    <thead class="">
    <tr class="">
      <th v-for="(header, index) of makeCharacterIterator(thead.length)"
          :key="header"
          :class="`x-${header} x-${header}-0 ${classesFor('th')}`"
      >
        {{format(thead[index])}}
      </th>
    </tr>
    </thead>
    <tbody class="bg-white">
    <tr v-for="(row, rowIndex) in datasource" :key="row.id" class="">
      <td v-for="(column, columnIndex) of makeCharacterIterator(thead.length)"
          :key="`${row.id}-${column}`"
          :class="`y-${rowIndex + 1} y-${rowIndex + 1}-${columnIndex} ${classesFor('tbody>tr>td')}`"
      >
        {{columnIndex.value}}
        {{row[thead[columnIndex]]}}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>

  /**
   * A minimalistic table
   * @datasource Array - The data presented in the table
   * @delegate Object - Object defining which attributes of the records are displayed
   */

  let _ = require("lodash");
  import { makeCharacterIterator } from '@/lib/characterIterator'

  export default {
    name: "Table",
    props: ["datasource", "delegate"],
    data: function(){
      return {
          sortBy: null,
          direction: null,
          theadIterator: null
      }
    },
    computed: {
      valid: function(){
        return this.delegate && this.delegate.headers
      },
      thead: function() {
        // if(!this.valid) { return [] }
        return this.delegate.headers.map(h => h.key)
      },
    },
    methods: {
      makeCharacterIterator: makeCharacterIterator,
      format: (input) => _.startCase(input),
      classesFor: (el) => {
        switch (el) {
          case 'th':
            return 'px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'
          case 'tbody>tr>td':
            return 'px-6 py-4 whitespace-no-wrap'
          default:
            return ''
        }
      }
    },
    watch: {
      datasource: function(){
        console.log('datasource changed')
        this.theadIterator = makeCharacterIterator(this.thead.length)
      },
      delegate: function(){
        this.theadIterator = makeCharacterIterator(this.thead.length)
      },
    }
  };
</script>
