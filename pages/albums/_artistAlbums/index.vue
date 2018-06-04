<template style>

<div class="album-cont">
  <nuxt-link @click="infoOff()" :to="'/'" class="col-5 home-button">HOME</nuxt-link>
  <h1>{{singleArtist}}</h1>
  <h2>{{singleAlbum.name}}</h2>
  <button class="detail-button" :style="{visibility: buttonState}" @click="infoOn()">MORE</button>
  <div class ="row description-container">
    <h3 class="col-7 description-text">{{this.description}}</h3>
    <div class="col-4 description-img" :style="{backgroundImage: 'url('+ this.img +')'}"></div>
  </div>
  <h4>SONGS</h4>
  <ul>
    <li class="song" v-for="(track,index) in this.tracks" :key="index">{{track.name}}</li>
  </ul>
  <h5>{{"listeners: " + this.listeners}}</h5>
</div> 
</template>

<script>
  export default {
    data() {
      return {
        tracks: [],
        img: '',
        description: '',
        listeners:'',
        buttonState: "visible"
      }
    },
    methods: {
      getAlbumInfo (artist,album) {
      fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=5c91e6be552144c6fb18b87f1e3f6bcc&artist=${artist}&album=${album}&format=json`)
  .then(function(response) {
    return response.json();
  })
  .then((result) => {
    this.$store.commit('transformAlbumInfo', result.album)
      }) 
    },
    infoOn() {
      this.tracks = this.informator.name.tracks.track,
      this.img = this.informator.name.image[2][`#text`],
      this.description = this.informator.name.wiki.summary
      this.listeners = this.informator.name.listeners
      this.buttonState = "hidden"
    },
    infoOff() {
      this.tracks = [],
      this.img = '',
      this.description = ''
      this.listeners = ''
      this.$store.commit('cleanInfo')
    }
    },
    computed : {
      informator () {
     return this.$store.getters.albumInformator
    },
      singleAlbum () {
        return this.$store.state.albums[this.$route.params.artistAlbums]
      },
      singleArtist () {
        return this.$store.getters.artistBiogpraphy.name
      }
    },
    created() {
      this.getAlbumInfo(this.singleArtist ,this.singleAlbum.name)
}
  }

</script>

<style>
.album-cont {
  min-height: 800px;
  justify-content: center;
  color: black;
}
.description-container {
  margin:auto;
}
h1 {
  text-align:center;
  font-size: 80px;
  margin:auto;
}
h2 {
  text-align:center;
  font-size:50px;
}
h3 {
  color: black;
}
h4 {
  text-align: center;
  justify-content: center;
  margin: auto;
  font-size: 30px;
  margin-top: 30px;
}
.song{
  font-size: 30px;
}
.description-img {
  color:red;
  background-size: 100% 100%;
  height: 500px;
  border-radius: 50px;
  min-width: 300px;
  margin:auto;
  overflow: hidden;
}
.description-text {
  margin: auto;
  min-width: 600px;
}
.detail-button {
  border-radius: 100%;
  border: 3px solid rgb(240, 242, 255);
  background-color: rgba(0, 0, 0, 0.986);
  justify-content: center;
  color: white;
  margin-left: 30px;
}
.home-button {
    height: 30px;
    text-decoration: none;
    color:white;
    font-size: 30px;
    border-radius: 20px;
    padding: 5px;
}
.home-button:hover {
    color:green;
    text-decoration: none;
} 
</style>

