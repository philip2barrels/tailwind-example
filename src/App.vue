<template>
  <div id="app">
    <TWTable :datasource="response"/>
  </div>
</template>

<script>
import TWTable from './components/TWTable.vue';

export default {
  name: 'App',
  components: {
    TWTable,
  },
  data: function(){
    return {
      response: [
        {
          id: 1,
          first_name: "Joe",
          last_name: "Dirt",
          email: "dirtyjoe@gmail.com"
        },
        {
          id: 2,
          first_name: "Tyler",
          last_name: "Durden",
          email: "killtv@gmail.com"
        }
      ]
    }
  }
};
</script>

