<template lang="pug">
  div#bottomButton(
    :class="thisClass"
  )
    div.bottomButton__wrapper(
      v-if="['subscribe'].includes($route.name)"
      @click="toSubscribe"
    )
      p.bottomButton__label {{ btnLabel }}
    slot.bottomButton__wrapper(
      v-if="['checkout'].includes($route.name)"
    )
</template>

<script>
export default {
  data: _ => ({
    thisClass: String,
  }),

  props: {
    btnLabel: String,
  },

  methods: {
    toSubscribe() {
      // to subscribe
      if (this.$route.name == 'subscribe') {
        this.$router.push({
          name: 'checkout',
        })
      }
    },
  },

  mounted () {
    if (this.$route.name == 'subscribe') {
      return this.thisClass = 'btn__float'
    }
    else if (this.$route.name == 'checkout') {
      return this.thisClass = 'btn__fixed'
    }
  },

}
</script>

<style lang="scss" scoped>
#bottomButton {
  display: block;
  padding: $grid4x $grid2x !important;

  &.btn__fixed {
    bottom: 0;
    position: fixed;
    height: calc(#{$bottom} + #{$grid4x});
    width: calc(100% - #{$grid4x}) !important;
    @include bottomBtnGrad();

    // iPhone X safearea
    @supports (padding-bottom: env(safe-area-inset-bottom)) {
      padding-bottom: calc(env(safe-area-inset-bottom) + #{$grid4x}) !important;
    }
  }

  .bottomButton__wrapper {
    margin: 0 auto;
    cursor: pointer;
    height: $bottom;
    background-color: #fff;
    width: calc(100% - #{$grid4x}) !important;
    @include border-radius();
    @include line-height($bottom);

    .bottomButton__label {
      color: $brand;
      font-weight: 700;
      text-align: center;
      @include line-height($grid8x);
    }
  }
}
</style>
