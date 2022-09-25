import storage from '@/utils/storage'
import {defineStore} from "pinia";

export const useProcessStore = defineStore('processStore', {
    namespaced: true,
    state: () => ({
        list: storage.get('process') || [
            {
                label: '首页',
                value: '/',
                keepAlive: true,
                active: true,
                name: 'Layout',
            },
        ],
    }),
    actions: {
        ADD_PROCESS(item) {
            const index = this.list.findIndex(
                (e) => e.value.split('?')[0] === item.value.split('?')[0]
            )

            this.list.map((e) => {
                e.active = e.value === item.value
            })

            if (item.value === '/') {
                item.label = '首页'
                item.name = 'Layout'
                item.value = '/'
                item.keepAlive = false
                item.active = true
            }

            if (index < 0) {
                if (item.label) {
                    this.list.push({
                        ...item,
                        active: true,
                    })
                }
            } else {
                this.list[index].active = true
                this.list[index].keepAlive = item.keepAlive || false
                this.list[index].label = item.label
                this.list[index].value = item.value
                this.list[index].name = item.name
            }

        },

        DEL_PROCESS(index) {
            this.list.splice(index, 1)
            storage.set('process', this.list)
        },

        SET_PROCESS(list) {
            this.list = list
            storage.set('process', list)
        },

        RESET_PROCESS() {
            this.list = [
                {
                    label: '首页',
                    value: '/',
                    keepAlive: true,
                    active: true,
                    name: 'Layout',
                },
            ]
            storage.set('process', this.list)
        },
    },
    getters: {
        
    }
});
