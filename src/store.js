import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        token: null,
        songs: [],
        needsRelogStatus: false
    },

    mutations: {
        'SET_TOKEN'(state, token) {
            state.token = token
        },
        'SET_SONGS'(state, songs) {
            state.songs = songs
        },
        'ADD_SONG'(state, song){
            state.songs.push(song)
        },
        'SET_RELOG_STATUS'(state, status){
            state.needsRelogStatus = status
        }
    },

    actions: {
        setToken(context, token) {
            context.commit('SET_TOKEN', token)
        },
        setSongs(context, songs) {
            context.commit('SET_SONGS', songs)    
        },
        addSong(context, song) {
            context.commit('ADD_SONG', song)
        },
        setRelogStatus(context, status){
            context.commit('SET_RELOG_STATUS', status)
        }
    },

    getters: {
        getAccessToken(state) {
            return state.token
        },
        getSongs(state){
            return state.songs
        },
        getNeedsRelogStatus(state){
            return state.needsRelogStatus
        }
    }

});