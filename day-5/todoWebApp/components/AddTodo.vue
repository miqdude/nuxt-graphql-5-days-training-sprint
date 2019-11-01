<template>
    <section>
        <form @submit.prevent="addTodo">
            <input type="text" v-model="todo">
            <input type="submit" value="+">
        </form>
    </section>
</template>

<script>
export default {
    name:"AddTodo",
    data(){
        return{
            todo:""
        }
    },
    methods:{
        addTodo(){
            console.log(this.todo)
            this.$emit("add-todo",this.todo)
            this.todo=""
        }
    }
}
</script>

<style>

</style>