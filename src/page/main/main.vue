<style lang="less">
  @import "../../components/main.less";
  @import "../../components/common.less";
</style>
<template>
  <div class="main" :class="{'main-hide-text': shrink}">
    <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
      <shrinkable-menu
        :shrink="shrink"
        @on-change="handleSubmenuChange"
        :theme="menuTheme"
        :before-push="beforePush"
        :open-names="openedSubmenuArr"
        :menu-list="menuList"
        v-if="menuList.length > 0">
        <div slot="top" class="logo-con" v-show="!shrink">
          <img src="../../images/logo02.png" key="max-logo"/>
        </div>
        <div slot="top" class="logo-con logo-con-close"  v-show="shrink">
          <img src="../../images/logo-mini2.png" key="min-logo" style="width:40px;height:auto;padding:9px 0;"/>
        </div>
      </shrinkable-menu>
    </div>
    <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
      <div class="main-header">
        <div class="navicon-con">
          <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text"
                  @click="toggleClick">
            <Icon type="navicon" size="32" style="color: #fff;"></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <div class="main-breadcrumb">
            <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
          </div>
        </div>
        <div class="header-avator-con">
          <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <div>
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ currentUser.realName }},欢迎您</span>
                </a>
              </div>
              <img src="../../images/car2.png"  style="margin-left: 10px;width:34px;">
            </Row>
          </div>
          <full-screen v-model="isFullScreen" @on-change="fullscreenChange" style="float: left"></full-screen>
          <lock-screen style="float: left;padding:21px 16px;"></lock-screen>
          <div @click="logOutFuc">
            <Tooltip content="登出" placement="bottom" style="font-weight: normal;padding:21px 19px;float: left;cursor: pointer">
              <Icon type="log-in" style="font-size:20px;color: #fff;"></Icon>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="single-page-con" :style="{left: shrink?'60px':'200px'}" style="padding:4px;border-right: 0;">
      <div class="single-page">
          <keep-alive :include="cachePage">
            <router-view></router-view>
          </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
  import shrinkableMenu from '@/components/main-components/shrinkable-menu/shrinkable-menu.vue';
  import breadcrumbNav from '@/components/main-components/breadcrumb-nav.vue';
  import fullScreen from '@/components/main-components/fullscreen.vue';
  import lockScreen from '@/components/main-components/lockscreen/lockscreen.vue';
  import util from '@/libs/util';
  import Cookies from 'js-cookie';
  import { mapState, mapMutations, mapActions } from 'vuex';
  export default {
    components: {
      shrinkableMenu,
      breadcrumbNav,
      fullScreen,
      lockScreen
    },
    data () {
      return {
        userName: '',
        isFullScreen: false
      };
    },
    computed: {
      ...mapState([
        'currentUser',
        'shrink',
        'isMgt'
      ]),
      openedSubmenuArr () {
        return this.$store.state.app.openedSubmenuArr;
      },
      menuList () {
        return this.$store.state.app.menuList;
      },
      currentPath () {
        return this.$store.state.app.currentPath; // 当前面包屑数组
      },
      avatorPath () {
        // localStorage.avatorImgPath = './../../images/car.png';
        return localStorage.avatorImgPath;
      },
      cachePage () {
        return this.$store.state.app.cachePage;
      },
      menuTheme () {
        return this.$store.state.app.menuTheme;
      },
      isLogin () {
        return this.$store.state.isLogin;
      }
    },
    methods: {
      ...mapMutations([
        'SET_CURRENT_USER',
        'SET_SHRINK',
        'IS_MGT'
      ]),
      ...mapActions([
        'initDict',
        'getDistrictData',
        'logout',
        'getCurrentUser'
      ]),
      init () {
        let pathArr = util.setCurrentPath(this, this.$route.name);
        this.$store.commit('updateMenulist', this.isMgt);
        this.$store.commit('addOpenSubmenu', pathArr[0].name);
        this.userName = Cookies.get('user');
      },
      toggleClick () {
        const shrink = !this.shrink;
        this.SET_SHRINK(shrink);
      },
      handleClickUserDropdown (name) {
        if (name === 'ownSpace') {
          util.openNewPage(this, 'ownspace_index');
          this.$router.push({
            name: 'ownspace_index'
          });
        } else if (name === 'loginout') {
          // 退出登录
          this.sysLogout();
        }
      },
      async sysLogout () {
        await this.logout();
        this._hyTool.removeStore('token', true);
        this._hyTool.removeStore('menuList', true);
        this._hyTool.removeStore('currentUser', true);
        this._hyTool.removeStore('mgtUser', true);
      },
      logOutFuc () {
        this.$Modal.confirm({
          title: '提示',
          content: '是否退出登录',
          onOk: () => {
            this._hyTool.removeStore('token', true);
            this._hyTool.removeStore('menuList', true);
            this.$store.commit('LOGOUT', this);
            this.logout();
            // this.$store.commit('clearOpenedSubmenu');
            if (this.isMgt) {
              this._hyTool.removeStore('mgtUser', true);
              this.$router.push('/mgt/login');
            } else {
              this._hyTool.removeStore('currentUser', true);
              this.$router.replace('/login');
            }
            // setTimeout(() => {
            //   window.location.reload(); // 退出登录刷新页面 清除router
            // }, 1);
          }
        });
      },
      handleSubmenuChange (val) {
      },
      beforePush (name) {
        // if (name === 'accesstest_index') {
        //     return false;
        // } else {
        //     return true;
        // }
        return true;
      },
      fullscreenChange (isFullScreen) {
      }
    },
    watch: {
      '$route' (to) {
        this.$store.commit('setCurrentPageName', to.name);
        let pathArr = util.setCurrentPath(this, to.name);
        /* if (pathArr.length > 2) {
          this.$store.commit('addOpenSubmenu', pathArr);
        } */
        this.$store.commit('addOpenSubmenu', pathArr[0].name);
        localStorage.currentPageName = to.name;
      }
    },
    async mounted () {
      await this.initDict();
      const currentUser = this._hyTool.getStore('currentUser', true);
      // 需要判断是否登录
      if (currentUser) {
        this.IS_MGT(false);
        this.SET_CURRENT_USER(JSON.parse(currentUser));
      } else {
        this.IS_MGT(true);
        this.SET_CURRENT_USER(JSON.parse(this._hyTool.getStore('mgtUser', true)));
      }
      this.init();
    },
    async created () {
      await this.getDistrictData();
      // 显示打开的页面的列表
      // this.$store.commit('setOpenedList');
    }
  };
</script>
