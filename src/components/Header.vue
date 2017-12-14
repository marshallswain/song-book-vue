<template>
<div>
 <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand">Song Book</router-link>
            </div>
            <div class="navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link v-show="!checkToken" to="/signup" activeClass="active" tag="li"><a>Sign up</a></router-link>
                    <router-link v-show="!checkToken"  to="/login" activeClass="active" tag="li"><a>Login</a></router-link>
                    <router-link v-show="!!checkToken" to="/songs/all" activeClass="active" tag="li"><a>View Songs</a></router-link>
                    <router-link v-show="!!checkToken" to="/songs/create" activeClass="active" tag="li"><a>Add songs</a></router-link>
                    <router-link v-show="!!checkToken" @click.native='logout' to="" activeClass="" tag="li"><a>Logout</a></router-link>
                    <router-link v-show="!!checkToken" to="/settings" activeClass="" tag="li"><a>Settings</a></router-link>
                </ul>
             <!-- Oddly enough, v-if does not work in this case, and gives buggy results. -->                
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</div>

</template>

<script>
import {mapActions} from 'vuex'
export default {
    data() {
        return {
        }
    }, 
    computed: {
        checkToken() {
            return this.$store.getters.getAccessToken
        } 
    },
    methods: {
        ...mapActions([
            'setToken'
        ]),
        logout() {
            this.$cookie.delete('accessToken')
            this.setToken(null)
            this.$router.push('/login')
        }
    },
    created() {
        const token = this.$cookie.get('accessToken')
        if(!this.checkToken && token){
            this.setToken(token)
        }
    }
}
</script>

<style>

</style>
