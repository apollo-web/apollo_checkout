<template lang="pug">
  div#checkout
    Header(
      headerTitle="Checkout"
    )
      div.header__left(
        slot="header__left"
        @click="$router.push('/')"
      )
        i.material-icons arrow_back

    div.checkout__section

      div.checkout__box.section__border
        div.section__title
          p.checkout__box-title Payment Info

      form.checkout__form(
        name="paymentInfo"
        @submit.prevent="sendPaymentInfo"
      )
        div.checkout__form-box(
          v-for="(value, key, index) in paymentInfo"
        )
          input.checkout__form-input(
            :placeholder="key.value"
            :maxlength="key.maxlength"
          )

    BottomButton
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/Header.vue'
import BottomButton from '@/components/BottomButton.vue'

export default {
  name: 'checkout',

  computed: {
    ...mapState([
      'paymentInfo',
    ]),
  },

  components: {
    Header,
    BottomButton,
  },

}
</script>

<style lang="scss" scoped>
#checkout {
  .checkout__section {
    padding: $header $grid4x 0;

    .checkout__box {
      .section__title {
        width: 100%;
        font-weight: 700;
        height: $grid12x;
        @include font-size($grid4x);

        p {
          @include line-height($grid7x);
        }
      }
    }

    .checkout__form {
      .checkout__form-box {
        height: $grid20x;

        .checkout__form-input {
          width: 100%;
          border: none;
          color: #fff;
          height: $grid12x;
          // background-color: $white10;
          background-color: transparent;
          border-bottom: 1px solid $white38;
          @include transition(all 0.25s ease);

          &:focus {
            border-bottom: 1px solid #fff;
          }
        }
      }
    }
  }
}
</style>
