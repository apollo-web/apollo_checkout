<template lang="pug">
  div#bottomButton(
    :class="thisClass"
  )
    div.bottomButton__wrapper(
      @click="goNext"
    )
      p.bottomButton__label Checkout
</template>

<script>
export default {

  data: _ => ({
    thisClass: String,
  }),

  methods: {

    start: _ => this.$Progress.start(),
    set: num => this.$Progress.set(num),
    increase: num => this.$Progress.increase(num),
    decrease: num => this.$Progress.decrease(num),
    finish: _ => this.$Progress.finish(),
    fail: _ => this.$Progress.fail(),

    goNext() {
      this.$Progress.start()
      this.$toasted.show('Your request is being processed...', {
        theme: 'primary',
        position: 'bottom-center',
        duration: 2500,
      })

      setTimeout(() => {
        if(this.$route.name == 'subscribe') {
          this.$router.push({
            name: 'checkout',
          })
        }
        this.$Progress.finish()
      }, 250)
    },
  },

  mounted () {
    if (this.$route.name == 'subscribe') {
      this.thisClass = 'btn__float'
    }
    else if (this.$route.name == 'checkout') {
      this.thisClass = 'btn__fixed'
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
      padding-bottom: calc(env(safe-area-inset-bottom));
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
