<template lang="pug">
  div#subscribe

    Header(headerTitle="Subscribe")
      div.header__left(slot="header__left")
        i.material-icons close

    div.subscribe__section

      div.subscribe__box.section__border
        div.section__title
          p.subscribe__box-title What's your weekly goal?
        div.section__combobox(
          v-for="(value, key, index) in weeklyGoal"
          :key="key"
        )
          div.section__combobox-sheet(
            @click="toggleSheet(true)"
            title="value"
          )
            div.section__combobox-box
              p.section__combobox-text {{ key }}
            div.section__combobox-icon
              i.material-icons expand_more

      div.subscribe__box.section__border
        div.section__title
          p.subscribe__box-title How much can you dedicate?
        div.section__radiobox(
          v-for="(value, key, index) in plans"
          :key="index"
        )
          div.section__radiobox-box(
            @click="setRadioBtn(key)"
          )
            div.section__radiobox-left
              div.section__radiobox-left-left
                i.material-icons {{ value.selected }}
              div.section__radiobox-left-right
                p.section__radiobox-text {{ key }}
                p.section__radiobox-renews Renews {{ value.renews }}
                div.section__radiobox-ratebox(
                  v-if="value.rate"
                ) Save {{ value.rate }}&percnt;
            div.section__radiobox-right
              p.section__radiobox-price {{ numberFormat(value.price, value.rate, value.m) }}

      div.subscribe__box.section__border
        div.section__title
          p.subscribe__box-title.summaryTitle Summary
        div.section__summarybox
          div.section__summarybox-box
            p.section__summarybox-text.bottomtext
              | 30 minutes per day, 5 days per week
            p.section__summarybox-text
              | Duration: {{ planMonth.m }} month
            p.section__summarybox-price Original Price
              span.section__summarybox-priceRight ₩ {{ opriceFormat(planMonth.price) }}
            p.section__summarybox-price(
              v-if="planMonth.rate"
            ) {{ planMonth.m }} month plan: You save {{ planMonth.rate }}&percnt;
              span.section__summarybox-priceRight - ₩ {{ savedPrice(planMonth.price, planMonth.rate, planMonth.m) }}
            p.section__summarybox-total Total Price
              span.section__summarybox-totalRight ₩ {{ totalPrice(planMonth.price, planMonth.rate, planMonth.m)  }}

    BottomButton

    div.subscribe__section.bottom
      div.bottom__condition
        p.bottom__condition-text.bottomtext
          | Your subscription will automatically {{ planMonth.renews }}.
        p.bottom__condition-text
          | You can cancel at anytime.

    BottomSheet.bottomsheet(
      v-if="bottomSheet"
    )
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Header from '@/components/Header.vue'
import BottomButton from '@/components/BottomButton.vue'
import BottomSheet from '@/components/BottomSheet'

export default {
  name: 'subscribe',

  computed: {
    ...mapState([
      'weeklyGoal',
      'plans',
      'bottomSheet',
    ]),

    planMonth() {
      let getPlanMonth = _.find(this.plans, {'selected': 'radio_button_checked'})
      return getPlanMonth
    },
  },

  methods: {
    ...mapMutations([
      'SET_BOTTOM_SHEET',
      'SET_RADIO_BTN',
    ]),

    numberFormat (p, r, m) {
      let saved = (p - ((p * r) / 100)) / m
      return saved.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    opriceFormat (n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    savedPrice (p, r, m) {
      let saved = (p - ((p * r) / 100)) / m
      return (p - ((saved) * m)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    totalPrice (p, r, m) {
      let saved = (p - ((p * r) / 100)) / m
      return ((saved) * m).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    toggleSheet(bool) {
      this.SET_BOTTOM_SHEET(bool)
    },

    setRadioBtn(key) {
      this.SET_RADIO_BTN(key)
    },
  },

  components: {
    Header,
    BottomButton,
    BottomSheet,
  },

}
</script>

<style lang="scss" scoped>
#subscribe {
  .subscribe__section {
    padding: $header $grid4x 0;

    &.bottom {
      padding: 0 $grid4x $grid8x;

      .bottom__condition {
        .bottom__condition-text {
          color: $white54;
          text-align: center;
          @include font-size($grid3x);

          &.bottomtext {
            margin-bottom: -#{$grid3x};
          }
        }
      }
    }

    .section__border {
      margin-bottom: $grid6x;
      padding-bottom: $grid6x;
      border-bottom: 1px solid $white38;
    }

    .subscribe__box {
      .section__title {
        width: 100%;
        font-weight: 700;
        height: $grid12x;
        @include font-size($grid4x);

        p {
          @include line-height($grid7x);
        }
      }

      .section__combobox {
        width: 100%;
        cursor: pointer;
        height: $grid12x;
        position: relative;

        .section__combobox-box {
          display: inline-block;
          position: absolute;
          width: calc(100% - #{$grid12x});

          p {
            width: calc(100% - #{$grid12x});
            @include font-size($grid4x);
            @include line-height($grid2x);
          }
        }

        .section__combobox-icon {
          right: 0;
          width: $grid12x;
          height: $grid12x;
          position: absolute;
          display: inline-block;

          i {
            float: right;
            padding-top: $grid;
            @include font-size($grid6x);
          }
        }
      }

      .section__radiobox {
        transform: translateY(-#{$grid4x});

        .section__radiobox-box {
          cursor: pointer;

          .section__radiobox-left {
            width: 65%;
            display: inline-block;

            .section__radiobox-left-left {
              width: $grid8x;
              vertical-align: top;
              display: inline-block;

              i {
                width: $grid12x;
                transform: translateY($grid);
              }
            }

            .section__radiobox-left-right {
              vertical-align: top;
              display: inline-block;
              width: calc(100% - #{$grid8x});

              .section__radiobox-text {
                font-weight: 700;

                @include font-size($grid4x);
                @include line-height($grid);
              }

              .section__radiobox-renews {
                color: $white54;
                padding-top: -#{$grid4x};
                @include font-size(14px);
                @include line-height($grid2x);
              }

              .section__radiobox-ratebox {
                color: $brand;
                font-weight: 700;
                display: inline-block;
                padding: $grid $grid3x;
                background-color: #fff;
                @include border-radius();
                @include font-size($grid3x);
              }
            }
          }

          .section__radiobox-right {
            width: 35%;
            text-align: right;
            display: inline-block;

            .section__radiobox-price {
              font-weight: 700;
              vertical-align: top;
              transform: translateY(6px);
              @include font-size($grid4x);

              &::before {
                content: '₩';
              }

              &::after {
                color: $white54;
                content: ' / mo.';
                @include font-size($grid3x);
              }
            }
          }
        }
      }

      .section__summarybox {
        .section__summarybox-box {
          .section__summarybox-text {
            color: $white54;
            @include font-size(14px);

            &.bottomtext {
              margin-top: -#{$grid2x};
              margin-bottom: -#{$grid3x};
            }
          }

          .section__summarybox-price,
          .section__summarybox-total {
            text-align: left;
            width: calc(100%);
            display: inline-block;
            @include line-height(0px);

            span {
              width: 50%;
              display: block;
              text-align: right;
              float: right !important;
              @include line-height(0px);
            }
          }

          .section__summarybox-total {
            font-weight: 700;
            @include font-size(18px);

            span {
              font-weight: 700;
              @include font-size(18px);
            }
          }
        }
      }
    }
  }
}
</style>
