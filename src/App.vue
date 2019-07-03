<template lang="pug">
  div#app(
    :class="{noscroll: bottomSheet}"
  )
    router-view
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
