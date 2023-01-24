// .vuepress/config.js
const path = require('path')
module.exports = {
  base:'./',
  title: "繁夏*忆汝",
  head: [
    ['link', { rel: 'icon', href: '/assets/img/bing.png' }],
    ['meta', { name: 'author', content: '繁夏*忆汝' }]],
  themeConfig: {
    lastUpdated:'更新时间',
    logo: '/assets/img/kenan.png',
    nav: [
      { text: 'home', link: '/' },
      { text: 'guide', link: '/guide/guide.md' },
      { text: 'java', link: '/java/' },
      { text: 'github', link: 'https://github.com/houkangxiong' },
    ],
    sidebar: {
      '/java/': [
        'elasticsearch',
        'rabbitmq'
      ],
      "/docker/":[
        "docker"
      ],
      '/guide/': [
        'guide',    
      ]
    }
  },
  configureWebpack: () => {
    const NODE_ENV = process.env.NODE_ENV
    //判断是否是生产环境
    if(NODE_ENV === 'production'){
      return {
        output: {
          publicPath: 'https://github.com/houkangxiong/doc/'
        },
        resolve: {
          //配置路径别名
          alias: {
            'public': path.resolve(__dirname, './public') 
          }
        }
      }
    }else{
      return {
        resolve: {
          //配置路径别名
          alias: {
            'public': path.resolve(__dirname, './public') 
          }
        }
      }
    }
  }
}