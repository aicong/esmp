<style lang="less">
  @import '../styles/menu.less';
</style>

<template>
  <div class="inner_menu">
    <Menu ref="sideMenu" :active-name="activeName" :open-names="openNames" :theme="menuTheme" width="auto"
          @on-select="changeMenu" accordion>
      <template v-for="(item, index) in menuList">
        <sidebar-menu-item :menuItem="item" :key="index"></sidebar-menu-item>
      </template>
    </Menu>
  </div>
</template>

<script>
  import sidebarMenuItem from './sidebarMenuItem';
  import util from '@/libs/util';
  export default {
    name: 'sidebarMenu',
    components: {
      sidebarMenuItem
    },
    props: {
      menuList: Array,
      iconSize: Number,
      menuTheme: {
        type: String,
        default: 'dark'
      },
      openNames: {
        type: Array
      }
    },
    computed: {
      currentPath () {
        let isOtherRouter = false; // 是否是其他路由(菜单以外的路由)
        let curPath = {};
        this.$store.state.app.routers.forEach(item => {
          if (item.children) {
            item.children.forEach(child => {
              if (child.name === this.$route.name) {
                curPath = child;
                // title = util.handleTitle(vm, child);
                if (item.name === 'otherRouter') {
                  isOtherRouter = true;
                }
              }
            });
          }
        });
        if (isOtherRouter) {
          return curPath.path.substring(curPath.path.lastIndexOf('/', curPath.path.lastIndexOf('/') - 1) + 1, curPath.path.lastIndexOf('/'));
        }
        return this.$route.name;
      },
      activeName () {
        const pathArr = util.setCurrentPath(this, this.$route.name);
        if (pathArr.length > 2) {
          return pathArr[1].name;
        }
        return this.$route.name;
      }
    },
    methods: {
      changeMenu (active) {
        this.$emit('on-change', active);
      },
      itemTitle (item) {
        if (typeof item.title === 'object') {
          return this.$t(item.title.i18n);
        } else {
          return item.title;
        }
      }
    },
    updated () {
      this.$nextTick(() => {
        if (this.$refs.sideMenu) {
          this.$refs.sideMenu.updateOpened();
        }
      });
    }

  };
</script>
