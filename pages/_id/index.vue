<template>
<div>
  <div>
    <nuxt-link :to="'/'" class="col-5 home-but" @click="getAlbum(this.artist.name),homeFunction()">HOME</nuxt-link>
    <h1 class="header">{{this.artist.name}}</h1>
    <div class ="row info-container">
      <div class ="col-7 bio">{{this.biography.bio}}</div>
      <div class="col-4 img" :style="{backgroundImage: 'url('+ this.$store.getters.artistsList[this.$route.params.id].img[`#text`] +')'}"></div>
    </div>
    <h1 style = "text-align: center; font-size: 50px; margin-top:95px;" >TOP ALBUMS</h1>
    <div class = "row album-list">
      <singleAlbum class = "col-10  "
        v-for="album in albums"
        :key="album.id"
        :name="album.name"
        :id="album.id"
      /> 
    </div>
  </div>
</div>
</template>

<script>
import 'isomorphic-fetch'
import singleAlbum from '@/components/singleAlbum'
export default {
   computed: {
    artist () {
      return this.$store.state.artists[this.$route.params.id]
    },
    albums () {
      return this.$store.getters.albumList
    },
    biography () {
      return this.$store.state.biography
    }
   },
     components: {
    singleAlbum: singleAlbum
  },
      methods: {
    getInfo (name) {
      fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=5c91e6be552144c6fb18b87f1e3f6bcc&format=json`)
  .then(function(response) {
    return response.json();
  })
  .then((result) => {
    this.$store.commit('transformInfo', result.artist)
      }) 
    },
       getAlbum (name) {
      fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&limit=5&artist=${name}&api_key=5c91e6be552144c6fb18b87f1e3f6bcc&format=json`)
  .then(function(response) {
    return response.json();
  })
  .then((result) => {
    this.$store.commit('transformAlbums', result.topalbums.album)
      }) 
    },
    homeFunction() {
      this.$store.commit('cleanInfo')
    }
    },
  created() {
      this.getInfo(this.artist.name)
      this.getAlbum(this.artist.name)
  },
  }
</script>

<style>
.header {
    text-align: center;
    font-size: 70px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
.img {
    height: 400px;
    min-width: 300px;
    background-color:green;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    background-size: cover;
    border-radius: 30px;
    margin: 10px;
    border: 3px solid white;
    justify-content: left;
    margin: auto;
}
.home-but {
    height: 30px;
    text-decoration: none;
    color:white;
    font-size: 30px;
    border-radius: 20px;
    padding: 5px;
}
.home-but:hover {
    color:green;
    text-decoration: none;
} 
.album-list {
    justify-content: center;
}
.bio {
    background-color: rgb(187, 51, 51);
    border-radius: 30px;
    padding: 40px;
    margin: 20px;
    border: 3px solid white;
    font-size: 20px;
    min-width: 300px;
    overflow: hidden;
}
.info-container {
    background-color:rgb(36, 33, 33);
    margin: auto;
    width: 100%;
}
</style>

