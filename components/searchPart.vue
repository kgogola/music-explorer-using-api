<template>
  <div>
    <div class = "row artist-searcher">
      <input class="col-5 search-column" v-model="query" placeholder ="search artist" v-on:input="generation(), setPage()">
    </div>
      <div class = "row localpage-navigator">
        <button class = "col-1 page-button" @click="pageDecrement">prev</button>
        <div class="col-0.5 page-info">{{actualPage}}</div>
      <button class = "col-1 page-button" @click="pageIncrement">next</button>
    </div>
    <div class = "row artists-list">
      <singleArtist class = "minature "
        v-for="artist in artists"
        :key="artist.id"
        :name="artist.name"
        :imgSource="artist.img[`#text`] "
        :id="artist.id"
        :page="actualPage"
      />
    </div>
  </div>
</template>


<script>
import 'isomorphic-fetch'
import singleArtist from '@/components/singleArtist'
export default {
  components: {
    singleArtist: singleArtist
  },
  data() {
    return {
      query:'',
      actualPage:'1',
    };
  },
  methods: {
    searchArtist (name,page) {
      fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&limit=32&page=${page}&api_key=5c91e6be552144c6fb18b87f1e3f6bcc&format=json`)
  .then(function(response) {
    return response.json();
  })
  .then((result) => {
    this.$store.commit('transformAll', result.results.artistmatches.artist)
      }) 
    },
    generation() {
      if (this.query.length>=3) {
      this.searchArtist(this.query,this.actualPage)
      } else {
         this.$store.commit('cleanArtists')
      }
    },
    pageIncrement() {
      this.$store.commit('cleanArtists')
      this.actualPage++
      this.generation()
    },
    pageDecrement() {
      if(this.actualPage>1) {
      this.$store.commit('cleanArray')
      this.actualPage--
      this.generation()   
      }
    },
    setPage() {
      this.actualPage = 1
    }
  },
  computed: {
    artists () {
      return this.$store.getters.artistsList
    },
  },
}
</script>

<style>
.artist-searcher {
  justify-content: center;
  margin: 30px;
}
.search-column {
  background-color: black;
  margin: 18px 18px 18px 18px;
  border-radius: 30px;
  border: 3px solid black;
  text-align: center;
  color: white;
  font-size: 30px;
  max-width: 100%;
}
.page-button {
  height: 30px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 2px;
  border-radius: 40px;
  background-color: green;
  border: 3px solid black;
  color: white;
  text-align: center;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size:10px;
}
.as {
  border: 3px solid black;
}
.localpage-navigator {
  justify-content: center;
  margin-top: 30px;
  
}
.artists-list {
  display: flex;
  justify-content: center;
  margin-left: auto;
      display: flex;
    flex-wrap: wrap;
    margin:10px;
}
.minature {
  margin-top: 25px;
  overflow: hidden;
  width: 230px;
  margin: 10px;
  

}
</style>
