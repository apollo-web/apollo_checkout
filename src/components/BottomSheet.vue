<template lang="pug">
  div#bottomSheet(
    :aria-hidden="{true: isActive}"
  )
    div.bottomSheet__dim(
      @click="toggleHandler(false)"
      :class="{active: !isActive}"
    )
    div.bottomsheet__sheet-wrapper
      div.bottomsheet__sheet-box
        div.bottomsheet__sheet(
          :class="{active: isActive}"
        )
          div.bottomsheet__wrapper
            div.bottomsheet__header
              div.bottomsheet__header-left(
                @click="toggleHandler(false)"
              )
                i.material-icons close
              div.bottomsheet__header-title
                div.bottomsheet__header-title-text {{ bottomSheetTitle }}
            slot
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    bottomSheetTitle: String,
  },

  data: _ => ({
    isActive: true,
  }),

  computed: {
    ...mapState([
      'bottomSheet',
    ]),
  },

  methods: {
    ...mapMutations([
      'SET_BOTTOM_SHEET'
    ]),

    toggleHandler(bool) {
      this.SET_BOTTOM_SHEET(bool)
      this.isActive = !this.isActive
    },

  },

  beforeDestroy () {
    this.SET_BOTTOM_SHEET(false)
  },

}
</script>

<style lang="scss" scoped>
#bottomSheet {
  top: 0;
  left: 0;
  z-index: 2;
  position: absolute;

  .bottomSheet__dim {
    z-index: 3;
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: $black54;
    animation: 0.35s dim_ease_in ease-in-out;

    @keyframes dim_ease_in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    &.active {
      animation: 0.35s dim_ease_out ease-in-out;

      @keyframes dim_ease_out {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    }
  }

  .bottomsheet__sheet-wrapper {
    .bottomsheet__sheet-box {
      z-index: 27;
      max-width: 100%;
      position: relative;

      .bottomsheet__sheet {
        bottom: 0;
        z-index: 28;
        width: 100vw;
        padding: $grid4x 0;
        position: absolute;
        background-color: #fff;
        margin-bottom: -#{$grid48x};
        border-radius: $grid4x $grid4x 0 0;
        animation: 0.35s slide_up ease-in-out;

        // android softkey
        @media screen and (device-aspect-ratio: 36/59) {
          padding-bottom: calc(#{$grid48x} + #{$grid12x}) !important;
        }

        // iPhone X safearea
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          padding-bottom: calc(env(safe-area-inset-bottom) + #{$grid52x});
        }

        @keyframes slide_up {
          from {
            opacity: 1;
            padding-bottom: $grid52x;
          }
          to {
            opacity: 0.5;
            padding-bottom: 0;
          }
        }

        &.active {
          animation: 0.35s slide_down ease-in-out;

          @keyframes slide_down {
            from {
              opacity: 0.5;
              padding-bottom: 0;
            }
            to {
              opacity: 1;
              padding-bottom: $grid52x;
            }
          }
        }

        .bottomsheet__wrapper {
          padding: 0 $grid4x;

          .bottomsheet__header {
            height: $grid12x;
            position: relative;

            .bottomsheet__header-left {
              color: #fff;
              cursor: pointer;
              height: $grid12x;
              position: absolute;
            }

            i,
            .bottomsheet__header-title-text {
              color: $text333;
              text-align: center;
              padding-top: $grid2x;
              display: inline-block;
            }

            .bottomsheet__header-title {
              .bottomsheet__header-title-text {
                height: $grid12x;
                overflow: hidden;
                font-weight: 700;
                margin: 0 $header;
                position: absolute;
                text-align: center;
                white-space: nowrap;
                display: inline-block;
                text-overflow: ellipsis;
                width: calc(100% - #{$header} - #{$header});
                @include font-size($grid4x);
                @include line-height($grid5x);
              }
            }
          }

          .bottomsheet__body {
            height: auto;
            color: $text333;

            .bottomsheet__body-list {
              cursor: pointer;
              height: $grid12x;
              @include font-size($grid4x);
              @include line-height($grid8x);
            }

            .bottomsheet__body-p {
              height: auto;
            }
          }
        }
      }
    }
  }
}
</style>
