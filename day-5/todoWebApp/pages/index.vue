<template>
  <div class="">
    <header>
      TodoWebApp
    </header>
    <section class="addList">
      <input type="text">
      <button @click="newTodo">+</button>
    </section>
    <section class="todoList">
      <ul >
        <li>
          <label for="">Do nothing</label>
          <button>-</button>
        </li>
        <li>
          <label for="">Do somthing</label>
          <button>-</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data(){
    return{
      books:{}
    }
  },
  methods:{
    newTodo(){
      console.log("new todo")
    }
  }
}
</script>