<template>
  <div>
      <p v-if="needToRelog" class='alert alert-warning'>You are not logged in, or your session has expired or ended.<p>
      <form action="" method="POST" v-if="!forgottenPassword" v-on:submit.prevent="signIn" style='width:300px;'>
        <div class="form-group">
            <input type="text" name='email' class='form-control' placeholder="email" v-model="user.email">
        </div>
        <div class="form-group">
            <input type="password" name='password' class='form-control' placeholder="password" v-model="user.password">
        </div>
        <button class='btn btn-primary'>Login</button>
      </form>
      <p v-if="invalidLogin" class='alert alert-warning'>{{invalidLoginMessage}}</p>
      <br v-if="!forgottenPassword"><br v-if="!forgottenPassword">
      <p v-if="!forgottenPassword" @click='forgottenPassword = !forgottenPassword'><a>Forgot password?</a></p>      
      <div  v-if="forgottenPassword" style='width:300px;'>
          <p>Enter your email</p>
          <div class="form-group">
            <input type="text" name='email' class='form-control' placeholder="email" v-model="forgottenPasswordEmail">
        </div>
        <button @click='recoverPassword' class='btn btn-primary'>Send password recovery email</button>
        <br><br>
        <button @click='getOutOfForgottenPasswordSection' class="btn btn-primary">Go back to main login</button>
      </div>
      <div v-if="noEmailFound">
        <br><br>
        <p class='alert alert-danger'>The email address '{{nonExistentEmail}}' could not be found.</p>      
      </div>
      <div v-if="emailFound">
          <br><br>
          <p class='alert alert-success'>An email with password recovery instructions has been sent to '{{this.existingEmail}}'</p>
      </div>
  </div>
</template>


<script>
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            needToRelog: this.$store.getters.getNeedsRelogStatus,
            invalidLogin: false,
            invalidLoginMessage: '',
            forgottenPassword: false,
            forgottenPasswordEmail: '',
            nonExistentEmail: '',
            existingEmail: '',
            noEmailFound: false,
            emailFound: false
        }
    },
    methods: {
        ...mapActions([
            'setToken',
            'setRelogStatus'
        ]),
        getOutOfForgottenPasswordSection() {
            this.forgottenPassword = false
            this.noEmailFound = false
            this.emailFound = false
        },
        onAuthSuccesS(res) {
            const id = res.body.id                
            const token = res.body.accessToken
            const username = res.body.username
            this.setRelogStatus(false)
            this.setToken(token)
            this.$cookie.set('username', username)
            this.$cookie.set('accessToken', token)
            this.$cookie.set('userId', id)
            this.$cookie.set('email', this.user.email)
            this.$router.push('/songs')
        },
        signIn() {
            this.needToRelog = false
            const credentials = Object.assign(this.user, {strategy: 'local'})
            this.$http.post('authentication', credentials)
            .then(res => {
                this.onAuthSuccesS(res)
            })
            .catch(resError => {
                this.invalidLogin = true
                if(resError.body.message === 'Invalid login'){
                    this.invalidLoginMessage = 'Your email or password was incorrect. Please try again.'
                }
                else {
                    this.invalidLoginMessage = 'An error occured. Please try logging in again'
                }
            })
        },
        recoverPassword() {
            this.$http.get(`emails?emailAddress=${this.forgottenPasswordEmail}`)
            .then(res => {
                this.noEmailFound = false
                if(!res.body.data.length){
                    this.nonExistentEmail = this.forgottenPasswordEmail
                    this.noEmailFound = true
                    this.emailFound = false
                }
                else{
                    this.emailFound = true
                    this.existingEmail = this.forgottenPasswordEmail
                }
            })
        }
    }
}
</script>

<style>

</style>
