<template>
  <div id="app">
    <div class="container">
      <input v-model="url" type="text" placeholder="https://jsonplaceholder.typicode.com/posts"/>
      <hr />
      <Table :datasource="response" :delegate="delegate">
        <!--
          <template v-slot:title>
            <b>FOO FREAKING BAR</b>
          </template>
          <template v-slot:body>
            <b>FOO FREAKING BODY</b>
          </template>
       -->
      </Table>
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
      url: '',
      response: [],
      delegate: null
      // delegate: {
      //   headers: [{
      //     key: 'title',
      //     label: 'Title'
      //   }, {
      //     key: 'body',
      //     label: 'Body'
      //   }
      //   ]
      // }
    }
  },
  mounted() {
    this.url = 'https://jsonplaceholder.typicode.com/posts'
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

