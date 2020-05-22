<template>
  <table :class="classesFor('table')">
    <thead :class="classesFor('thead')">
    <tr :class="classesFor('thead>tr')">
      <th v-for="(header, index) in thead"
          :key="header"
          :data-table-column="index"
          :data-table-row="0"
          :data-table-item="`${index}-0`"
          :class="classesFor('thead>tr>th')"
      >
        {{format(header)}} {{presentCoordinatesFor(`\{${index},0\}`)}}
      </th>
    </tr>
    </thead>
    <tbody :class="classesFor('tbody')">
    <tr v-for="(row, rowIndex) in datasource"
        :key="`row-${rowIndex + 1}`"
        :class="classesFor('tbody>tr')"
    >
      <td v-for="(column, columnIndex) in thead"
          :key="`item-${rowIndex + 1}-${column}`"
          :data-table-column="columnIndex"
          :data-table-row="rowIndex + 1"
          :data-table-item="`${rowIndex + 1}-${columnIndex}`"
          :class="classesFor('tbody>tr>td')"
      >
        <template v-if="!hasSlotContent(column)">
          {{row[thead[columnIndex]]}}
        </template>
        <slot :name="thead[columnIndex]"
              v-bind="row[thead[columnIndex]]"
              v-if="hasSlotContent(column)"
        />
        {{presentCoordinatesFor(`\{${rowIndex + 1},${columnIndex}\}`)}}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  /**
   * A minimalistic table
   *
   * Goals:
   * + stylable
   * + testable
   *
   * @datasource Array - The data presented in the table
   * @delegate Object - (Optional) Object defining which attributes of the records are displayed
   *
   * Slots -
   * Any column can have a slot used rather than render the data
   * To provide slot content, target the key definined in the delegate for that columns header
   * When you are provide a named slot whatever is in the slot will be displayed
   *
   * Columns or individual rows are accesible using data attributes:
   * data-table-colummn
   * data-table-row
   *
   * Returns HTMLCollection contained in first column
   * document.querySelectorAll('[data-table-column="1"]');
   *
   * Returns HTMLCollection of item with specific coordinate
   * document.querySelectorAll('[data-table-item="1-0"]');
   *
   */

  let _ = require("lodash");

  export default {
    name: "Table",
    props: ["datasource", "delegate"],
    data: function(){
      return {
        sortBy: null,
        direction: null,
        showCoordinates: false
      }
    },
    computed: {
      valid: function(){
        return this.delegate && this.delegate.headers
      },
      thead: function() {
        if(!this.valid) { return [] }
        return this.delegate.headers.map(h => h.key)
      },
    },
    watch: {
      datasource: function(){
        if (!this.delegate && this.datasource){
          /*
               Create a delegate to show all datasource's items
               when a custom delegate hasn't been defined
           */
          const delegate = {headers:[]}
          const headers = Array.from(new Set(this.datasource.map(function(item) { return Object.keys(item) }).flat()))

          headers.forEach(header => delegate.headers.push({key: header, label: _.startCase(header)}))
          this.delegate = delegate
        }
      }
    },
    methods: {
      format: (input) => _.startCase(input),
      hasSlotContent: function(key){ return Object.keys(this.$slots).indexOf(key) > -1 },
      presentCoordinatesFor: function(coords) { return this.showCoordinates ? coords : '' },
      classesFor: (el) => {
        switch (el) {
          // case 'table':
          //   return 'min-w-full table'
          case 'thead':
            return ''
          case 'thead>tr':
            return ''
          case 'thead>tr>th':
            return 'px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'
          case 'tbody':
            return 'bg-white'
          case 'tbody>tr':
            return ''
          case 'tbody>tr>td':
            return 'px-6 py-4 whitespace-no-wrap'
          default:
            return ''
        }
      }
    }
  };
</script>
