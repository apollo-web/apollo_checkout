<template lang="pug">
  div#app(
    :class="{noscroll: bottomSheet}"
  )
    router-view
    vue-progress-bar
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'bottomSheet',
    ])
  },

}
</script>

<style lang="scss">
#app {
  background-color: $brand;
}
</style>
