<template>
  <div class="page-wrapper">
    <div class="box">
      <p class="title">后台管理系统</p>
      <el-form
          label-position="top"
          label-width="80px"
          :model="formModel"
          ref="loginForm"
          :rules="rules"
      >
        <el-form-item label="用户名">
          <el-input v-model="formModel.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formModel.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { generateDynamicRoutes } from '@/router';
import { useUserStore } from '@/store/modules/user.js';
import { useMenuStore } from '@/store/modules/menu.js';
import { useProcessStore } from '@/store/modules/process.js';

export default {
  setup() {
    const router = useRouter();

    const loginForm = ref(null);
    let state = reactive({
      formModel: {
        username: "admin",
        password: "123456",
      },
      loading: false,
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    });

    const handleLogin = () => {
      loginForm.value.validate(async (valid) => {
        if (valid) {
          state.loading = true;
          try {
            // 登录
            const userStore = useUserStore();
            await userStore.login(state.formModel);
            // 获取用户信息
            await userStore.getUserInfo();
            // 获取用户有权限的菜单
            const menuStore = useMenuStore();
            const menus = await menuStore.getMenus();
            if (!menus) {
              ElMessage.error("该账号没有权限");
            } else {
              //根据菜单生成对应的路由
              await generateDynamicRoutes(menus)
              router.push('/');
            }
            state.loading = false;
          } catch (error) {
            console.log(error);
            state.loading = false;
            ElMessage.error(error);
          }
        }
      });
    };

    // eslint-disable-next-line no-unused-vars
    const handleLoginout = () => {
      const userStore = useUserStore();
      const menuStore = useMenuStore();
      const processStore = useProcessStore();
      userStore.CLEAR_USER();
      userStore.CLEAR_TOKEN();
      menuStore.CLEAR_MENU_GROUP();
      menuStore.CLEAR_VIEW_ROUTES();
      processStore.RESET_PROCESS();
    };

    return {
      ...toRefs(state),
      loginForm,
      handleLogin,
    };
  },
};
</script>

<style scoped lang="scss">
.page-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: #2f3447;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  color: #ffffff;
  font-size: 14px;
  margin-bottom: 60px;
  letter-spacing: 1px;
}
:deep(.el-form-item) {
  width: 300px;
}
:deep(.el-form-item__label) {
  color: #ffffff;
  float: left;
}
:deep(.el-button) {
  color: #000;
  width: 300px;
  margin-top: 20px;
}
</style>
