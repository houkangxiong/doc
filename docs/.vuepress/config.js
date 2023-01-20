// .vuepress/config.js
module.exports = {
  base:'./',
  title: "繁夏*忆汝",
  head: [
    ['link', { rel: 'icon', href: '/assets/img/kenan.png' }],
    ['meta', { name: 'author', content: '繁夏*忆汝' }]],
  themeConfig: {
    lastUpdated:'更新时间',
    logo: '/assets/img/kenan.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '导航', link: '/guide/guide.md' },
      { text: 'java', link: '/java/' },
      { text: 'github', link: 'https://github.com/HickeyHou?tab=repositories' },
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
  }
}