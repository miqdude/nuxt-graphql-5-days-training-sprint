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

export default {
  components:{
    AddTodo,
    Todo
  },
  data(){
    return{
      todos:[
        {
          id:1,
          title:"do nothing"
        },
        {
          id:2,
          title:"do something"
        }
      ]
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
  // ,created(){
  //   return [
  //     {
  //       id:1,
  //       title:"do nothing",
  //     },
  //     {
  //       id:2,
  //       title:"do something"
  //     }
  //   ]
  // }
}
</script>