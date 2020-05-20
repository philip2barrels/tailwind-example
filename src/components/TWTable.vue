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
  let _ = require("lodash");

  export default {
    name: "TWTable",
    props: ["datasource"],
    computed: {
      thead: function() {
        return Array.from(
          new Set(this.datasource.map(n => Object.keys(n)).flat())
        );
      }
    },
    methods: {
      format: (input) => _.startCase(input)
    },
    mounted: function() {
      console.log(_.startCase("foo-bar"));
    }
  };
</script>
