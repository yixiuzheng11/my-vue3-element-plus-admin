<template>
  <el-config-provider :locale="locale">
    <div id="root">
      <router-view/>
    </div>
  </el-config-provider>
</template>

<script>
import {ElConfigProvider, ElNotification} from 'element-plus'
import {defineComponent, reactive, toRefs} from "vue";
import { useAppStore } from '@/store/modules/app.js';

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    const appStore = useAppStore()
    const state = reactive({
      locale: appStore.language
    });

    return {
      ...toRefs(state)
    }
  },
})
</script>

<style lang="scss" ></style>