module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
                @import "@/styles/style.scss";
              `
      },
    },
  },
  devServer: {
    port: 3030,
  },
  pwa: {
    name: 'apollo_checkout',
    themeColor: '#844DFF',
    msTileColor: '#844DFF',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    appleMobileWebAppCapable: 'no',
  },
}
