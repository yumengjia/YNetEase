const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      //网易
      "/netease":{
        target:"http://localhost:3000",  
        ws:true,
        changeOrigin:true,
        pathRewrite:{
          "^/netease":""
        }
      }
    }
  }
})
