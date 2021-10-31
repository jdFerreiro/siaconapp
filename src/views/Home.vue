<template>
  <div id="container">
    <MainHeader></MainHeader>
    <MainMenu></MainMenu>
  </div>
</template>

<script>
// @ is an alias to /src
import MainMenu from '@/components/MainMenu.vue'
import MainHeader from '@/components/MainHeader.vue'

export default {
  name: 'Home',
  components: {
    MainMenu,
    MainHeader
  }
}
</script>
