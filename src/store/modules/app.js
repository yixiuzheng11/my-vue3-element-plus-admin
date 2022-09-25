import { getToken } from '@/utils/auth';
import { getLocale} from '@/i18n';
import storage from '@/utils/storage';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
    namespaced: true,
    state: () => ({
        language: getLocale()
    }),
    actions: {
        appLoad({dispatch}){;
            if (getToken()) {
                dispatch("menu/generateRoutes", null, { root: true });
                dispatch("user/queryUserInfo", null, { root: true });
            }
        },
        setLanguage(language) {
            this.SET_LANGUAGE(language);
        },
        SET_LANGUAGE: (language) => {
            this.language = language;
            storage.set('language', language);
        },
    },
    getters: {

    }
});