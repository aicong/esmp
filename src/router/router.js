// /**
//  * 描述：路由文件
//  */
// import App from '../App';
import main from '@/page/main/main';

// 基础信息
const user = r => require.ensure([], () => r(require('@/page/main/userManage/userM/index.vue')), 'user'); // 用户管理
const userAdd = r => require.ensure([], () => r(require('@/page/main/userManage/userM/add.vue')), 'userAdd'); // 用户新增

const role = r => require.ensure([], () => r(require('@/page/main/userManage/role/index.vue')), 'role'); // 角色管理
const roleAdd = r => require.ensure([], () => r(require('@/page/main/userManage/role/add.vue')), 'roleAdd'); // 角色添加
const password = r => require.ensure([], () => r(require('@/page/main/userManage/password/index.vue')), 'password'); // 修改密码
// const tenant = r => require.ensure([], () => r(require('@/page/main/userManage/tenant/index.vue')), 'role'); // 租户管理
// const tenantAdd = r => require.ensure([], () => r(require('@/page/main/userManage/tenant/add.vue')), 'roleAdd'); // 租户添加

// 日志管理
const sysLog = r => require.ensure([], () => r(require('@/page/main/userManage/sysLog/index.vue')), 'sysLog'); // 系统日志

const department = r => require.ensure([], () => r(require('@/page/main/baseManage/department/index.vue')), 'department'); // 部门管理
const departmentEdit = r => require.ensure([], () => r(require('@/page/main/baseManage/department/edit.vue')), 'departmentEdit'); // 部门新增或编辑

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('@/page/login/login')
};

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import('@/page/404/404')
};

export const locking = {
  path: '/locking',
  name: 'locking',
  component: () => import('@/components/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: main,
  children: [
    { path: 'home', title: '首页', name: 'home', component: () => import('@/page/main/home/home.vue') },
    { path: 'userManage/user/add', title: '新增/编辑', name: 'userAdd', component: userAdd },
    { path: 'userManage/role/add', title: '新增/编辑', name: 'roleAdd', component: roleAdd },
    { path: 'baseManage/department/edit', title: '新增/编辑', name: 'departmentEdit', component: departmentEdit }
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
// 权限菜单中对应的上的菜单用 权限菜单的ID 对应不上需要显示的 id:1  不需要显示id:0
export const appRouter = [
  {
    id: 'tms.ucenter',
    path: '/userManage',
    icon: 'icon-5',
    name: 'userManage',
    title: '用户中心',
    component: main,
    children: [
      {
        id: 'tms.ucenter.user',
        path: 'user',
        title: '用户管理',
        name: 'user',
        icon: 'normal',
        component: user
      },
      {
        id: 'tms.ucenter.role',
        path: 'role',
        title: '角色管理',
        name: 'role',
        icon: 'normal',
        component: role
      },
      {
        id: 'tms.ucenter.department',
        path: 'department',
        title: '部门管理',
        name: 'department',
        icon: 'normal',
        component: department
      },
      {
        id: '1',
        path: 'password',
        title: '修改密码',
        name: 'password',
        icon: 'normal',
        component: password
      },
      {
        id: '1',
        path: 'sysLog',
        title: '日志管理',
        name: 'sysLog',
        icon: 'normal',
        component: sysLog
      }
      // {
      //   id: 3,
      //   path: 'tenant',
      //   title: '租户管理',
      //   name: 'tenant',
      //   icon: 'normal',
      //   component: tenant
      // }
    ]
  }
];

// 所有上面定义的路由都要写在下面的routers里
export const routes = [
  loginRouter,
  otherRouter,
  locking,
  ...appRouter,
  page404
];
