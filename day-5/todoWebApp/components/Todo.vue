<template>
    <div class="todo">
        <label for="">{{title}}</label>
        <button @click="deleteTodo">-</button>
        <button @click="editTodo">edit</button>
        <input type="text" v-show="editing" @keyup.enter="doneEditing">
    </div>    
</template>

<script>
export default {
    name:"Todo",
    props:['id','title','editing','newVal'],
    methods:{
        deleteTodo(){
            // console.log("todo id "+this.id)
            this.$emit('delete-todo',this.id)
        },
        editTodo(){
            this.$emit('editing-todo',this.id)
        },
        doneEditing(){
            this.$emit('done-editing-todo',this.id)
        }
    }
}
</script>

<style>

</style>