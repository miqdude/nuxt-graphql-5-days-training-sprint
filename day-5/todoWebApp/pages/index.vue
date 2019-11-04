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
import axios from 'axios'

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
    try {
      const res = await axios({
        url: 'localhost:8080/graphql',
        methods:'post',
        data:{
          query:`
            query todos{
              id,
              title
            }
          `
        }
      })
      
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>