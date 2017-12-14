<template>
<div>
    <div class='alert alert-success' v-if="songCreationSuccess">
        <p>The song "{{addedSong}}" has been added to your collection. You can now create another song, or <a href='#/songs/all'>view all songs.</a> </p>
    </div>
    <div class='alert alert-danger' v-if="songCreationFailure">
        <p>Something went wrong and your song was not correctly added. Please try logging out and back in.</p>
    </div>
    <div class='row'>
      <form action="/songs" method="POST" v-on:submit.prevent="createSong" style='width: 300px' class='col-md-6'>
        <div class="form-group">
            <input type="text" name='name' class='form-control' placeholder="Name of song" v-model="song.name">
        </div>
        <div class="form-group">
            <input type="text" name='composer' class='form-control' placeholder="Composer" v-model="song.composer">
        </div>
        <div class="form-group">
            <input type="text" name='lyricist' class='form-control' placeholder="Lyricist" v-model="song.lyricist">
        </div>
        <div class="form-group">
            <input type="number" name='yearCreated' class='form-control' placeholder="Year Created" v-model="song.yearCreated">
        </div>
        <div class="form-group">
            <input type="text" name='language' class='form-control' placeholder="Language" v-model="song.language">
        </div>
        <div class="form-group">
            <input type="text" name='haveChart' class='form-control' placeholder="Have chart?" v-model="song.haveChart">
        </div>
        <div class="form-group">
            <input type="text" name='keys' class='form-control' placeholder="Keys" v-model="song.keys">
        </div>
        <div class="form-group">
            <input type="text" name='instrumentations' class='form-control' placeholder="Instrumentations" v-model="song.instrumentations">
        </div>
        <div class="form-group">
            <input type="text" name='season' class='form-control' placeholder="Season" v-model="song.season">
        </div>
        <div class="form-group">
            <input type="text" name='rehearsedWith' class='form-control' placeholder="Rehearsed With" v-model="song.rehearsedWith">
        </div>
        <div class="form-group">
            <input type="text" name='miscCategories' class='form-control' placeholder="Misellaneous Categories" v-model="song.miscCategories">
        </div>
        <div class="form-group">
            <input type="text" name='notes' class='form-control' placeholder="Notes" v-model="song.notes">
        </div>
        <button class='btn btn-primary'>Create Song</button>
        <br><br>
        <div class='alert alert-danger' v-if="missingName">
        <p>You must enter a song name.</p>
    </div>
      </form>
      <div class='col-sm-3'>
          <span><strong>Pre-fill options. Click to use</strong></span>
          <br><br>
        <div>
            <span>Language</span>
            <br>
            <span v-for="language in language" :key='language'>
                <span @click='addAttributeToInput(language, "language")'>{{language}} </span>
            </span>
            <br><br>
        </div>
        <div>
            <span>Have Chart</span>
            <br>
            <span v-for="chart in haveChart" :key='chart'>
                <span @click='addAttributeToInput(chart, "haveChart")'>{{chart}} </span>
            </span>
            <br><br>  
        </div>
        <div>
            <span>Keys</span>
            <br>
            <span v-for="key in keys" :key='key'>
                <span @click='addAttributeToInput(key, "keys")'>{{key}} </span>
            </span>
            <br><br>
        </div>
        <div>
            <span>Instrumentations</span>
            <br>
            <span v-for="instrument in instrumentations" :key='instrument'>
                <span @click='addAttributeToInput(instrument, "instrumentations")'>{{instrument}} </span>
            </span>
            <br><br>  
        </div>
        <div>
            <span>Season</span>
            <br>
            <span v-for="season in season" :key='season'>
                <span @click='addAttributeToInput(season, "season")'>{{season}} </span>
            </span>
            <br><br>
        </div>
        <div>
            <span>Rehearsed With</span>
            <br>
            <span v-for="rehearsal in rehearsedWith" :key='rehearsal'>
                <span @click='addAttributeToInput(rehearsal, "rehearsedWith")'>{{rehearsal}} </span>
            </span>
            <br><br> 
        </div>
        <div>
            <span>Miscellaneous</span>
            <br>
            <span v-for="miscCategory in miscCategories" :key='miscCategory'>
                <span @click='addAttributeToInput(miscCategory, "miscCategories")'>{{miscCategory}} </span>
            </span>
        </div>
    </div>
    </div>
  </div>   
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            song: {
                language: '',
                haveChart: '',
                keys: '',
                instrumentations: '',
                season: '',
                rehearsedWith: '',
                miscCategories: ''
            },
            songs:[],
            language: [],
            haveChart: [],
            keys: [],
            instrumentations:[],
            season: [],
            rehearsedWith: [],
            miscCategories:[],
            songCreationSuccess: false,
            songCreationFailure: false,
            addedSong: '',
            missingName: false
        }
    },

    methods: {
        onCreationSuccess(){
            this.songCreationSuccess = true;
            this.songCreationFailure = false
            this.missingName = false
            this.addSong(this.song)
            this.addedSong = this.song.name
            this.song = {
                language: '',
                haveChart: '',
                keys: '',
                instrumentations: '',
                season: '',
                rehearsedWith: '',
                miscCategories: ''
            }
            this.setupPreviouslyUsedAttributes()
        },
        ...mapActions([
            'addSong'
        ]),
        setupPreviouslyUsedAttributes() {
            const fieldsToCheck = ['language', 'haveChart', 'keys', 'instrumentations', 'season', 'rehearsedWith', 'miscCategories']
            this.songs.forEach(song => {
                fieldsToCheck.forEach(field => {
                    if(song[field]){
                        //Only necessary to look at the data if it exists
                        var currentFields = song[field].split(' ')
                        //split up the data - For instance instrumentations might have 'piano, guitar, violin all in one line'
                        currentFields.forEach(entry => {
                          var currentField = entry.toLowerCase().trim()
                          currentField = currentField[0].toUpperCase() + currentField.substring(1)
                          //Standardize the way this is shown. 'English'    
                          if(!this[field].includes(currentField)){
                              //If the array in the components data does not have the currently checked field, add it.
                            this[field].push(currentField)
                          }                                  
                        })                   
                    }
                })
            })
        },
        addAttributeToInput(value, field){
            if(!this.song[field]){
             this.$set(this.song, field, (this.song[field] + value))                                                         
            }
            else {
             this.$set(this.song, field, (this.song[field] + " " + value))                                         
            }
        },
        createSong() {
            if(!this.song.name){
                this.missingName = true
                return
            }
            this.missingName = false
            const token = this.$cookie.get('accessToken')
            this.$http.post('songs', this.song, { headers: { Authorization: this.$cookie.get('accessToken') } })
            .then(res => {
               this.onCreationSuccess()
            })
            .catch(err => {
                if(err.body.code === 401){
                  this.songCreationFailure = true
                }
            })
            
        }
    },

    created() {
        this.songs = this.$store.getters.getSongs
        this.setupPreviouslyUsedAttributes()
    }
}
</script>

<style>

</style>
