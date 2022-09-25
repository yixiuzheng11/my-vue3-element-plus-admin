import {variables} from '@/config/theme.config.js'
import storage from '@/utils/storage'
import {defineStore} from "pinia";


export const useSettingStore = defineStore('settingStore', {
    namespaced: true,
    state: () => ({
        theme: storage.get('theme') || variables.theme,
    }),
    actions: {
        changeSetting(data) {
            this.CHANGE_SETTING(data);
        },
        CHANGE_SETTING: ({ key, value }) => {
            switch (key) {
                case 'theme':
                    this.theme = value
                    break
                default:
                    break
            }
            storage.set(key, value);
        }
    },
    getters: {
        
    }
});
