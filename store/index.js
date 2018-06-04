import Vuex from 'vuex'
import 'isomorphic-fetch'

const createStore = () => {
  return new Vuex.Store({
    state: {
      artists: [],
      biography:[],
      albums: [],
      albumInfo: [],

    },
    getters: {
      artistsList(state) {
        return state.artists
      },
      albumList(state) {
        return state.albums
      },
      artistBiogpraphy(state) {
        return state.biography
      },
      albumInformator(state) {
        return state.albumInfo
      }
    },
    mutations: {
      transformAll(state, artistArray) {
        state.artists  = artistArray.map(function(singleArtist,index) {
          const artist = singleArtist
            return {
              name: artist.name,
              img: artist.image[2],
              id:index
            }     
      })
    },
    cleanArtists(state) {
      state.artists = []
    },
    cleanBiography(state) {
      state.biography = ''
    },
    cleanALbums(state) {
      state.albums = []
    },
    cleanInfo(state) {
      state.albumInfo = []
    },
    transformInfo(state, bio) {
       state.biography.bio = bio.bio.summary
       state.biography.name = bio.name
    },
    transformAlbums(state, albumsArray) {
      state.albums  = albumsArray.map(function(singleAlbum,index) {
        const album = singleAlbum
          return {
            name: album.name,
            id:index
          }     
    })
  },
    transformAlbumInfo(state,info) {
      state.albumInfo.name = info
     // state.albumInfo.date = info.wiki.published
      // state.albumInfo.tracks = info.tracks
    },
  }
  

})
}

export default createStore
