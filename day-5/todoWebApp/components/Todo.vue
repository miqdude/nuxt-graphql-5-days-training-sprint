<template>
    <div class="todo">
        <label for="">{{title}}</label>
        <button>-</button>
    </div>    
</template>

<script>
export default {
    name:"Todo",
    props:['title','id']
}
</script>

<style>

</style>