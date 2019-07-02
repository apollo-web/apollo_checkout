<template lang="pug">
  div#checkout
    Header(headerTitle="Checkout")
      div.header__left(slot="header__left" @click="$router.push('/')")
        i.material-icons arrow_back

    div.checkout__section

    BottomButton
</template>

<script>
import Header from '@/components/Header.vue'
import BottomButton from '@/components/BottomButton.vue'

export default {
  name: 'checkout',

  components: {
    Header,
    BottomButton,
  },

}
</script>

<style lang="scss" scoped>
</style>
