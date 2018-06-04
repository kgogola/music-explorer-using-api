<template>
<div>
    <nuxt-link style="text-decoration:none" :to="'/albums'+'/'+id">
        <div class="single-album">
           <a>{{name}}</a> 
        </div>
    </nuxt-link>
    </div>
</template>

<script>


export default {
  props: ['name','id']
}
</script>

<style scoped>
.single-album {
  display: flex;
  flex-flow: column;
  text-align: center;
  background-color: rgb(2, 2, 2);
  border: 3px solid #ccc;
  box-sizing: border-box;
  height: 150px;
  overflow:hidden;
  justify-content: center;
  margin: 10px;
  font-size: 30px;
  text-decoration: none;
  color: red;
  border-radius:20px;
}
.single-album:hover {
    text-decoration: none;
    font-size: 34px;
}
.album-img {
  background-position: center;
  background-size: cover;
}
</style>
