module.exports = {
    router: {
        // 全局配置 <nuxt-link> 组件默认的激活类名（高亮）
        linkActiveClass: 'active',
        // 自定义路由规则表
        extendRoutes(routes, resolve) {
            // 清除 Nuxt。js 基于 pages 目录默认生成的路由规则表
            routes.splice(0)
            routes.push({
              path: '/',
              component: resolve(__dirname, 'pages/layout/'),
              children: [
                {
                    path: '', // 默认子路由
                    name: 'home',
                    component: resolve(__dirname, 'pages/home/')
                },
                {
                    path: '/login',
                    name: 'login',
                    component: resolve(__dirname, 'pages/login/')
                },
                {
                    path: '/register',
                    name: 'register',
                    component: resolve(__dirname, 'pages/login/')
                },
                {
                    path: '/profile/:username',
                    name: 'profile',
                    component: resolve(__dirname, 'pages/profile/')
                },
                {
                    path: '/profile/:username/favorites',
                    name: 'profile1',
                    component: resolve(__dirname, 'pages/profile/')
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: resolve(__dirname, 'pages/settings/')
                },
                {
                    path: '/editor',
                    name: 'editor',
                    component: resolve(__dirname, 'pages/editor/')
                },
                {
                    path: '/editor/:slug',
                    name: 'editor1',
                    component: resolve(__dirname, 'pages/editor/')
                },
                {
                    path: '/article/:slug',
                    name: 'article',
                    component: resolve(__dirname, 'pages/article/')
                }]
            })
          }
    },

    // 注册插件
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ]
}