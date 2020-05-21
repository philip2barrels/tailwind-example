<template>
  <table class="min-w-full table">
    <thead class="">
    <tr class="">
      <th v-for="header in thead" :key="header" class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">{{format(header)}}</th>
    </tr>
    </thead>
    <tbody v-if="datasource" class="bg-white">
    <tr v-for="row in datasource" :key="row.id" class="">
      <td v-for="column in thead" :key="`${row.id}-${column}`" class="px-6 py-4 whitespace-no-wrap">{{row[column]}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>

  /**
   * A minimalistic, sortable table
   * @datasource Array - The data presented in the table
   * @delegate Object - Object defining which attributes of the records are displayed
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
      columnIndexes: function(){
        if(!this.valid) { return [] }
        const result = []
        let count=0
        for(let i=0; i<this.delegate.thead.length; i++){

          result.push()
        }
        return result
      }
    },
    methods: {
      format: (input) => _.startCase(input)
    }
  };
</script>
