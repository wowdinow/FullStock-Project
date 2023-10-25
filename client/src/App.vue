<script>
import Navbar from './components/Navbar.vue'

export default{
    components: {
      Navbar
    }
}
</script>

<template>
  <Navbar v-if="this.$route.path !== '/login' && this.$route.path !== '/register'" />
   <RouterView />
</template>

<style>

</style>
