<template>
  <div id="app">
    <div class="container">
      <input v-model="url" type="text" placeholder="https://jsonplaceholder.typicode.com/posts"/>
      <hr />
      <Table :datasource="response"/>
    </div>
  </div>
</template>

<script>

import Table from './components/Table.vue';

export default {
  name: 'App',
  components: {
    Table,
  },
  data: function(){
    return {
      url: 'https://jsonplaceholder.typicode.com/posts',
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
  },
  watch: {
    url: function(val){
      try {
        fetch(this.url)
          .then(response => response.json())
          .then(json => this.response = json)
      } catch (e) {
        alert(e)
      }
    }
  }
};
</script>

