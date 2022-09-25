
import { loadRouter, loadMenuRoutes } from '@/router';
import { loadGuards } from '@/router/guards';
import { loadComponents } from '@/components';
import { loadSvg } from '@/icons';
import { loadDirectives } from '@/directives';
import { loadI18n } from '@/i18n';
import {loadElementPlusIcons} from '@/plugins/element-plus-icons';
import pinia from '@/store';

export async function bootstrap(options){
    const {app} = options;
    app.use(pinia);

    //加载基础路由（登录页面，401和402）
    const router = loadRouter(app);
    //加载主页（/）所对应路由信息
    await loadMenuRoutes();
    //加载路由卫士
    await loadGuards(router);

    loadElementPlusIcons(app);
    loadI18n(app);
    loadComponents(app);
    loadSvg();
    loadDirectives(app);

    return { router};
}