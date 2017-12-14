<template>
    <div style='width:370px;'>
        <button class='btn btn-primary' @click='changingPassword = true' v-if="!changingPassword && !changingUsername">Change Password</button>
        <button class='btn btn-primary' @click='changingUsername = true' v-if="!changingPassword && !changingUsername">Change Username</button>
        <div v-if="changingPassword">
            <div class="form-group">
                Current Password <input type="password" name='password' class='form-control' placeholder="password" v-model="currentPassword">
            </div>
            <div class="form-group">
                New Password <input type="password" name='password' class='form-control' placeholder="password" v-model="newPassword">
            </div>
            <div class="form-group">
                Confirm New Password <input type="password" name='password' class='form-control' placeholder="password" v-model="confirmedNewPassword">
            </div>
            <button class='btn btn-primary' @click='changePassword'>Submit Changes</button>
            <button class='btn btn-primary' @click='changingPassword  = false'>Go back</button>
        </div>
        <div v-if="changingUsername">
            <div class="form-group">
                Current Username <input type="text" name='username' class='form-control' :value='username' disabled=true>
            </div>
            <div class="form-group">
                New Username <input type="text" name='newUsername' class='form-control' v-model="newUsername">
            </div>
            <button class='btn btn-primary' @click='changeUsername'>Submit Changes</button>
            <button class='btn btn-primary' @click='changingUsername = false'>Go back</button>
        </div>
        <br><br>
        <p class='alert alert-danger' v-if="passwordsDoNotMatch">Your new password and confirmation do not match.</p>
        <p class='alert alert-success' v-if="passwordChangeSuccess">Your password has been changed successfully.</p>        
        <p class='alert alert-danger' v-if="passwordChangeFailure">Something went wrong, your password has not been changed.</p>        
        <p class='alert alert-danger' v-if="passwordFieldEmpty">Your password field cannot be empty</p>        
        <p class='alert alert-danger' v-if="incorrectCurrentPassword">Your current password was incorrect.</p>        
        <p class='alert alert-success' v-if="usernameChangeSuccess">Your username has been updated.</p>        
        <p class='alert alert-danger' v-if="usernameChangeFailure">An error has occured. Your username has not changed.</p>        
    </div>
</template>

<script>
export default {
    data(){
        return {
            username: this.$cookie.get('username'),
            newUsername: '',
            changingPassword: false,
            changingUsername: false,
            currentPassword: '',
            newPassword: '',
            confirmedNewPassword: '',
            incorrectCurrentPassword: false,
            passwordsDoNotMatch: false,
            passwordFieldEmpty: false,
            passwordChangeSuccess: false,
            passwordChangeFailure: false,
            usernameChangeSuccess: false,
            usernameChangeFailure: false
        }
    },
    methods: {
        changeUsername(){
            const id = this.$cookie.get('userId')
            if(this.changeUsername === ''){
                this.usernameChangeSuccess = false
                this.usernameChangeFailure = true
                return
            }            
            this.$http.patch(`users/${id}`, {username: this.newUsername})
            .then(res => {
                this.usernameChangeFailure = false
                this.usernameChangeSuccess = true
                this.$cookie.set('username', this.newUsername)
            })
            .catch(err => {
                this.usernameChangeSuccess = false
                this.usernameChangeFailure = true
            })
        },
        changePassword(){
            this.passwordFieldEmpty = false
            if(this.currentPassword === '' || this.newPassword === ''){
                this.passwordFieldEmpty = true
                return
            }
            if(this.newPassword !== this.confirmedNewPassword){
                this.passwordsDoNotMatch = true
            }
            else {
                this.passwordsDoNotMatch = false
                const credentials = {
                    email: this.$cookie.get('email'),
                    password: this.currentPassword,
                    strategy: 'local'
                }
                this.$http.post('authentication', credentials)
                .then(res => {
                    const id = this.$cookie.get('userId')
                    this.$http.patch(`users/${id}`, {password: this.confirmedNewPassword})
                    .then(res => {
                        this.passwordChangeSuccess = true
                    })
                })
                .catch(err => {
                    if(err.body.code === 401){
                        this.incorrectCurrentPassword = true
                    }
                    else{
                      this.passwordChangeFailure = true
                    }
                })
            }
        }
    }
}
</script>

<style>

</style>
