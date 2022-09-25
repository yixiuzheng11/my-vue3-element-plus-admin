import { login, getUserInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import storage from '@/utils/storage';
import { useMenuStore } from '@/store/modules/menu.js';
import { useProcessStore } from '@/store/modules/process.js';
import { defineStore } from 'pinia';


export const useUserStore = defineStore('userStore', {
    namespaced: true,
    state: () => ({
        token: getToken() || null,
        userInfo: storage.get('userInfo') || {},
    }),
    actions: {
        async login(form) {
            return login(form).then((res) => {
                this.SET_TOKEN(res.data);
                return res.data;
            })
        },
        logout() {
            const menuStore = useMenuStore();
            const processStore = useProcessStore();
            this.CLEAR_USER();
            this.CLEAR_TOKEN();
            menuStore.CLEAR_MENU_GROUP();
            menuStore.CLEAR_VIEW_ROUTES();
            processStore.RESET_PROCESS();
        },
        async getUserInfo() {
            return getUserInfo().then((res) => {
                this.SET_USERINFO(res.data);
                return res.data.userInfo
            })
        },
        SET_TOKEN(token) {
            setToken(token)
            this.token = token
        },
        SET_USERINFO(userInfo) {
            storage.set('userInfo', userInfo)
            this.userInfo = userInfo
        },
        CLEAR_USER() {
            this.userInfo = {}
            storage.remove('userInfo')
        },
        CLEAR_TOKEN() {
            this.token = null
            removeToken()
        }
    },
    getters: {

    },
});
