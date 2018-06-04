<template>
    <nuxt-link :to="'/'+ id">
        <div class="single-artist" :style="{backgroundImage: 'url('+ imgSource +')', backgroundSize: imgSize}">
            <h2>{{name}}</h2>
             <div class="artist-img"></div>
        </div>
    </nuxt-link>
</template>

<script>


export default {
  props: ['name', 'imgSource',"id","page",'imgSize'],
  methods: {
    setImage() {
      if (this.imgSource === '') {
            this.imgSource = "https://png.icons8.com/metro/1600/music.png"
      }
    },
    created() {
      this.setImage()
    }
  }
}
</script>

<style scoped>
.single-artist {
  display: flex;
  flex-flow: column;
  text-align: center;
  background-size: cover;
  background-color: rgb(0, 0, 0);
  border: 3px solid #ccc;
  box-sizing: border-box;
  overflow:hidden;
  height: 300px;
  color:red;
  padding: 10px;
}
.artist-img {
  margin: auto;
  background-position: center;
  background-size: cover;
  font-size: 5px;
  justify-content: center;
  height: 200px;
  width: 200px;
}
</style>
