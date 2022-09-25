import { getPermMenu } from '@/api/user';
import { deepTree, revisePath, getViewPath } from '@/utils';
import { ElMessage } from 'element-plus';
import storage from '@/utils/storage';
import { defineStore } from 'pinia';
import { isNull } from '@/utils'

export const useMenuStore = defineStore('menuStore', {
    namespaced: true,
    state: () => ({
        // 菜单列表
        menuGroup: storage.get('menuGroup') || [],
        // 路由列表
        viewRoutes: storage.get('viewRoutes') || [],
        //菜单折叠状态
        collapse: storage.get('collapse') || false,
    }),
    actions: {
        async getMenus() {
            return new Promise((resolve, reject) => {
                getPermMenu()
                    .then((result) => {
                        const menus = result.data;
                        console.log(menus);
                        const routes = menus
                            .filter((e) => e.type !== 2)
                            .map((e) => {
                                return {
                                    id: e.id,
                                    parentId: e.parentId,
                                    path: revisePath(e.path),
                                    viewPath: e.viewPath,
                                    name: e.name,
                                    meta: {
                                        keepAlive: e.meta.keepAlive === 1,
                                        title: e.meta.title,
                                        type: e.meta.type,
                                        icon: e.meta.icon,
                                        show: e.meta.show,
                                    },
                                    children: [],
                                }
                            })

                        // 设置菜单组
                        const menuGroup = deepTree(routes);
                        this.SET_MENU_GROUP(menuGroup);

                        // 设置视图路由
                        const viewRoutes = routes.filter((e) => e.meta.type === 1)
                        this.SET_VIEW_ROUTES(viewRoutes);
                        resolve(viewRoutes)
                    })
                    .catch((err) => {
                        console.error('菜单加载异常', err)
                        ElMessage.error({
                            message: '"菜单加载异常"',
                            type: 'error',
                        })
                        reject(err)
                    })
            })
        },
        SET_MENU_GROUP(list) {
            this.menuGroup = list;
            storage.set('menuGroup', list);
        },
        SET_VIEW_ROUTES(list) {
            this.viewRoutes = list;
            storage.set('viewRoutes', list);
        },
        COLLAPSE(value = false) {
            this.collapse = value;
            storage.set('collapse', value);
        },
        CLEAR_MENU_GROUP() {
            this.menuGroup = [];
            storage.remove('menuGroup');
        },
        CLEAR_VIEW_ROUTES() {
            this.viewRoutes = [];
            storage.remove('viewRoutes');
        }
    },
    getters: {

    }
});
