<template>
<div>
    <p>Welcome to Song Book!</p>
</div>

</template>

<script>
export default {
    methods: {
        checkIfToken() {
            if(this.$cookie.get('accessToken')){
                this.$router.push('/songs')
            }
            else{
              this.$router.push('/login')
            }
        }
    },

    created() {
        this.checkIfToken()
    }
}
</script>

<style>

</style>
