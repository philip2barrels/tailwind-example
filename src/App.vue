<template>
  <div id="app">
    <div class="container">
      <input v-model="url" type="text" placeholder="https://jsonplaceholder.typicode.com/posts"/>
      <hr />
      <Table :datasource="response" :delegate="delegate"/>
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
      response: [],
      delegate: {
        headers: [{
          key: 'title',
          label: 'Title'
        }, {
          key: 'body',
          label: 'Body'
        }
        ]
      }
    }
  },
  watch: {
    url: function(val){
      if(!val || val === '') {return}
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

