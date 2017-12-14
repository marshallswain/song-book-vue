<template>
  <div>
      <form action="/users" method="POST" v-on:submit.prevent="signup" style='width:500px;'>
        <div class="form-group">
            <input type="text" name='email' class='form-control' placeholder="email" v-model="user.email">
        </div>
        <div class="form-group">
            <input type="password" name='password' class='form-control' placeholder="password" v-model="user.password">
        </div>
         <div class="form-group">
            <input type="password" name='confirmation' class='form-control' placeholder="Confirm password" v-model="confirmedPassword">
        </div>
        <button class='btn btn-primary'>Sign up</button>
      </form>
      <br>
        <button @click='loginPage' class='btn btn-primary'>Already signed up? Sign in</button>  
        <br><br>
        <div v-if="signupError" class='alert alert-danger' style='width:500px;'>
            {{signupErrorMessage}}
        </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                email: '',
                password: '',
                username: ''
            },
            confirmedPassword: '',
            signupError: false,
            signupErrorMessage: ''
        }
    },

    methods: {
        signup() {
            this.signupError = false
            if(this.user.password !== this.confirmedPassword){
                this.signupError = true
                this.signupErrorMessage = 'Your passwords must match!'
                return
            }
            if(this.confirmedPassword.length < 6){
                this.signupError = true
                this.signupErrorMessage = 'Your password must be longer than 5 characters.'
                return
            }
            this.$http.post('users', this.user)
            .then(res => {
                this.$router.push('/login')
            })
            .catch(resErr => {
                if(resErr.body.name === 'Conflict'){
                    this.signupError = true
                    this.signupErrorMessage = `The email ${this.user.email} already exists.`
                }
                else{
                    this.signup = true
                    this.signupErrorMessage = 'An error occured. Please try signing up again.'
                }
            })
        },
        loginPage(){
            this.$router.push('/login')
        }
    }
}
</script>

<style>

</style>
