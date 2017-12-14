<template>
  <div>
     <div class="row" v-if="!songDeleted">
        <div class="col-sm-3">
             <div class='alert alert-success' v-if="songEditSuccess">
                <p>The song "{{song.name}}" has been updated. </p>
            </div>
            <form action="/songs" method="POST" v-on:submit.prevent="submitChanges" >
                <div class="form-group">
                    Name of Song <input type="text" name='name' class='form-control' placeholder="Name of song" v-model="song.name" :disabled='!editing'>
                </div>
                <div class="form-group">
                Composer <input type="text" name='composer' class='form-control' placeholder="Composer" v-model="song.composer" :disabled='!editing'>
                </div>
                <div class="form-group">
                    Lyricist <input type="text" name='lyricist' class='form-control' placeholder="Lyricist" v-model="song.lyricist" :disabled='!editing'>
                </div>
                <div class="form-group">
                    Year Created <input type="text" name='yearCreated' class='form-control' placeholder="Year Created" v-model="song.yearCreated" :disabled='!editing'>
                </div>
                <div class="form-group">
                    Language <input type="text" name='language' class='form-control' placeholder="Language" v-model="song.language" :disabled='!editing'>
                </div>
                <div class="form-group">
                    Have chart <input type="text" name='haveChart' class='form-control' placeholder="Have chart" v-model="song.haveChart" :disabled='!editing'>
                </div>
                <div class="form-group">
                Keys <input type="text" name='keys' class='form-control' placeholder="Keys" v-model="song.keys" :disabled='!editing'>
                </div>
                <div class="form-group">
                    Instrumentations <input type="text" name='instrumentations' class='form-control' placeholder="Instrumentations" v-model="song.instrumentations" :disabled='!editing'>
                </div>
                <div class="form-group">
                Season <input type="text" name='season' class='form-control' placeholder="Season" v-model="song.season" :disabled='!editing'>
                </div>
                <div class="form-group">
                Rehearsed With <input type="text" name='rehearsedWith' class='form-control' placeholder="Rehearsed With" v-model="song.rehearsedWith" :disabled='!editing'>
                </div>
                <div class="form-group">
                    Misellaneous Information <input type="text" name='miscCategories' class='form-control' placeholder="Misellaneous Information" v-model="song.miscCategories" :disabled='!editing'>
                </div>
                <div class="form-group">
                    Notes <input type="text" name='notes' class='form-control' placeholder="Notes" v-model="song.notes" :disabled='!editing'>
                </div>
                <button class='btn btn-primary' v-if="editing">Submit Changes</button>
            </form>
            <br v-if="editing">
           
            <button class='btn btn-primary' @click='cancelChanges 'v-if="editing">Cancel Changes</button>              
            <button class='btn btn-primary' @click='currentlyEditing' v-if="!editing">Edit This Song</button>
            <br><br>
            <button class="btn btn-danger" @click='deleteSong'>Delete This Song</button>
        </div>
        <div class='col-sm-3' v-if="editing">
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
    <div v-if="songDeleted">
    <p class='alert alert-success'>The song {{song.name}} has been removed from your collection.</p>
    <a class='btn btn-primary'href="#/songs">Go back to songs list</a>          
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            song: {
                
            },
            songs:[],
            language: [],
            haveChart: [],
            keys: [],
            instrumentations:[],
            season: [],
            rehearsedWith: [],
            miscCategories:[],
            editing: false,
            songEditSuccess: false,
            songDeleted: false
        }
    },

    methods: {
        currentlyEditing(){
            this.editing = true,
            this.songEditSuccess = false
        },
        checkAndSetAttributes() {
            const fieldsToCheck = ['language', 'haveChart', 'keys', 'instrumentations', 'season', 'rehearsedWith', 'miscCategories']
            fieldsToCheck.forEach(field => {
                if(!this.song[field]){
                    this.song[field] = ''
                }
            })            
        },
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
            if(this.editing) {
                if(!this.song[field]){
                this.$set(this.song, field, (this.song[field] + value))                                                         
                }
                else {
                this.$set(this.song, field, (this.song[field] + " " + value))                                         
                }
            }
           
        },
        getSongFromParams() {
            const id = this.$route.params.id
            this.$http.get(`songs/${id}`, {headers: {Authorization: this.$cookie.get('accessToken')}})
            .then(res => {
                const song = res.body
                this.song = song
            })
        },
        submitChanges(){
            const id = this.$route.params.id            
            this.$http.patch(`songs/${id}`, this.song, {headers: {Authorization: this.$cookie.get('accessToken')}})
            .then(res => {
                this.getSongFromParams()
                this.editing = false
                this.songEditSuccess = true
            })
        },
        cancelChanges() {
            this.getSongFromParams()
            this.editing = false
        },
        deleteSong() {
            if(confirm('Are you sure you want to delete this song? This cannot be undone.')){
                const id = this.$route.params.id
                this.$http.delete(`songs/${id}`, {headers: {Authorization: this.$cookie.get('accessToken')}})
                .then(res => {
                    this.handleDeletionProcess(res)
                })
            }
            
        },
        handleDeletionProcess(res) {
            this.song = {}
            this.song.name = res.body.name
            this.songDeleted = true
        }
    },

    created() {
        this.songs = this.$store.getters.getSongs
        this.setupPreviouslyUsedAttributes()
        this.getSongFromParams()
        this.checkAndSetAttributes()        
    }
}
</script>

<style>

</style>
