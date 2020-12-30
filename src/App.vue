<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  position: fixed;
  right: 10px;
  top: 10px;
  background: black;
}
</style>

<template>
  <div id="app">
    <StageControls/>
  </div>
</template>

<script>
import StageControls from './components/StageControls/StageControls.vue'

export default {
  name: 'App',
  components: {
    StageControls
  }
}
</script>