<template>
  <div class="todoList">
    <AddTodo v-on:add-todo="addTodo"/>
    <div class="list_container">
      <Todo v-for="todo in todos" :key="id" :id="todo.id" :title="todo.title" />
    </div>
  </div>
</template>

<script>
import AddTodo from "../components/AddTodo"
import Todo from "../components/Todo"

import fetch from 'node-fetch'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-boost'
import ApolloClient from 'apollo-client'

import gql from 'graphql-tag'

const endPointUrl = 'http://localhost:9000/graphql'
const link = new createHttpLink({uri:endPointUrl,fetch:fetch})
const apolloclient = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

export default {
  components:{
    AddTodo,
    Todo
  },
  data(){
    return{
      todos:[]
    }
  },
  methods:{
    addTodo(todo){
      this.todos.push({
        id:2,
        title:"OMG"
      })
    }
  }
  ,async created(){
    const query = gql`
      {
        todos{
          id,
          title
        }
      }
    `;
    try {
      const res = await apolloclient.query({query})
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>