<template>
  <div>
      <router-view class='child'></router-view>      
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },

    created() {
        this.$router.push('/songs/all')
    }
}
</script>

<style>

</style>
