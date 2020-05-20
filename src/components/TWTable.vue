<template>
  <table class="min-w-full bg-black">
    <thead>
    <tr>
      <th v-for="header in thead" :key="header" class="px-4 py-2">{{format(header)}}</th>
    </tr>
    </thead>
    <tbody v-if="datasource">
    <tr v-for="row in datasource" :key="row.id">
      <td v-for="column in thead" :key="`${row.id}-${column}`">{{format(row[column], 'row')}}</td>
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
      format: (input, style = "thead") => {
        switch (style) {
          case "row":
            return _.startCase(input);
            break;
          default:
            return _.startCase(input);
        }
      }
    },
    mounted: function() {
      console.log(_.startCase("foo-bar"));
    }
  };
</script>
