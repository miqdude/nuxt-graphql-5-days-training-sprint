<template>
  <div class="todoList">
    <AddTodo v-on:add-todo="addTodo"/>
    <div class="list_container">
      <Todo v-for="todo in todos" :key="todo.id" :id="todo.id" :title="todo.title" 
      v-on:delete-todo="deleteTodo" :editing="todo.editing" v-on:done-editing-todo="doneEditing"
      v-on:editing-todo="editingTodo" v-model="temp"/>
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
      todos:[],
      temp:null
    }
  },
  methods:{
    async addTodo(todo){
      const query = gql`
        mutation{
          addTodo(title:"${todo}"){
            id,
            title
          }
        }
      `;
      try {
        const res = await apolloclient.mutate({mutation:query})
        this.todos.push(res.data.addTodo)
        console.log(res.data.addTodo)
      } catch (err) {
        console.log(err)
      }
    },
    async deleteTodo(id){
      // console.log("todo id"+id)
      const todoEl = this.todos.find(t => t.id === id)
      const todoindex = this.todos.indexOf(todoEl)
      // console.log(todoindex)
      const query = gql`
        mutation{
          deleteTodo(id:${id})
        }
      `;
      try {
        const res = await apolloclient.mutate({mutation:query})
        console.log(res)
        if(res.data.deleteTodo === 1){
          this.todos.splice(todoindex,1)
        }
      } catch (error) {
        console.log(error)
      }
    },
    editingTodo(id){
      console.log("editing "+id)
      this.todos.find(t=>t.id === id).editing = true
    },
    doneEditing(id, newValue){
      console.log("done editing "+id)
      console.log(this.temp)
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
      let tmp = res.data.todos
      
      tmp.forEach(element => {
        element.editing = false
        element.newVal = null
      });
      
      this.todos = tmp
    } catch (error) {
      console.log(error)
    }
  }
}
</script>