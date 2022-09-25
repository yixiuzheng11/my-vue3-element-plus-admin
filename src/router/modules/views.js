const routes = {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    children: [
        {
            path: '/my/info',
            name: 'info',
            component: () => import('@/views/my/info.vue'),
            meta: {
                show: false,
                icon: '',
                keepAlive: 1,
                type: 1,
                title: '个人中心'
            }
        }
    ],
}

export default routes;