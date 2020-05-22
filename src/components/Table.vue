<template>
  <table class="min-w-full table">
    <thead class="">
    <tr class="">
      <th v-for="(header, index) in thead"
          :key="header"
          :data-table-column="index"
          :data-table-row="0"
          :class="classesFor('th')"
      >
        {{format(header)}} {{`\{${index},0\}`}}
      </th>
    </tr>
    </thead>
    <tbody class="bg-white">
    <tr v-for="(row, rowIndex) in datasource" :key="row.id" class="">
      <td v-for="(column, columnIndex) in thead"
          :key="`${row.id}-${column}`"
          :data-table-column="columnIndex"
          :data-table-row="rowIndex + 1"
          :class="classesFor('tbody>tr>td')"
      >
        {{row[thead[columnIndex]]}} {{`\{${rowIndex + 1},${columnIndex}\}`}}
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
   * @delegate Object - Object defining which attributes of the records are displayed
   *
   * Coloumns and rows are accesible using the data attributes:
   * data-table-colummn-Integer
   * data-table-row-Integer
   *
   * Example:
   * //Returns HTMLCollection contained in first column
   * document.querySelectorAll('[data-table-column="1"]');
   *
   */

  let _ = require("lodash");

  export default {
    name: "Table",
    props: ["datasource", "delegate"],
    data: function(){
      return {
          sortBy: null,
          direction: null
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
    methods: {
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
  };
</script>
