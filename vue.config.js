const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
  devServer: {
    proxy: 'http://192.168.0.8/'
  }
};
