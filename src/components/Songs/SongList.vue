<template>
  <div>
     <div>
      <vue-good-table
        :title='getUsername'
        :columns="columns"
        :rows="songs"
        :paginate="true"
        :perPage='20'
        :onClick="viewSong"
        :globalSearchFn="searchFn"
        :globalSearch= "true"
        />
    </div>
</div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  data() {
    return {
      songs: [],
      sortedBySelection: '',
      sortedByType: 'Ascending',
      username: this.$cookie.get('username'),
      columns: [
        {
          label: 'Name',
          field: 'name',
          filterable: true
        },
        {
          label: 'Composer',
          field: 'composer',
          filterable: true
        },
        {
          label: 'Lyricist',
          field: 'lyricist',
          filterable: true          
        },
        {
          label: 'Year Created',
          field: 'yearCreated',
          filterable: true          
        },
        {
          label: 'Language',
          field: 'language',
          filterable: true          
        },
        {
          label: 'Have Chart',
          field: 'haveChart',
          filterable: true          
        },
        {
          label: 'Keys',
          field: 'keys',
          filterable: true          
        },
        {
          label: 'Instrumentations',
          field: 'instrumentations',
          filterable: true          
        },
        {
          label: 'Season',
          field: 'season',
          filterable: true          
        },
        {
          label: 'Rehearsed With',
          field: 'rehearsedWith',
          filterable: true          
        },
        {
          label: 'Miscellaneous Categories',
          field: 'miscCategories',
          filterable: true          
        },
        {
          label: 'Notes',
          field: 'notes',
          filterable: true
          
        }
      ],
    }
  },

  methods: {
    searchFn(row, col, cellValue, searchTerm) {
      let searchMatch = true
      const searchTerms = searchTerm.trim().toLowerCase().split(' ')
      const rowFields = ['language', 'name', 'composer', 'season','lyricist', 'yearCreated', 'haveChart','keys','instrumentations','miscCategories', 'notes', 'rehearsedWith' ]
      let rowValues = []
      rowFields.forEach(field => {
        if(row[field]){
          const values = row[field].toLowerCase().split(' ')
          values.forEach(value => {
            rowValues.push(value)
          })
        }
      })
      searchTerms.forEach(term => {
        for(let i = 0; i < rowValues.length; i++){
          if(rowValues[i].indexOf(term) > -1){
            searchMatch = true
            break
          }
            searchMatch = false
        }
      })
      return searchMatch
    },
    initializeSite(res){
      this.songs = res.body.data;
      this.setSongs(this.songs)
      },
    ...mapActions([
      'setSongs',
      'setRelogStatus'
    ]),
    getSongs() {
      const token = this.$cookie.get("accessToken");
      this.$http
        .get("songs", {
          headers: { Authorization: this.$cookie.get("accessToken") }
        })
        .then(res => {
          //Upon successful response, set the site up.
          this.initializeSite(res)
        })
        .catch(err => {
          //If there's a failure, assume user is not valid, not logged in, or needs to relog.
          this.setRelogStatus(true)
          this.$router.push('/login')
        })
        
    },
    viewSong(song) {
      this.$router.push(`/songs/${song._id}`)
    }
  },

  computed: {
    getUsername() {
      return `${this.username}'s Song Collection`
    }
  },

  created() {
    this.getSongs()
  }
};
</script>

<style>

</style>
