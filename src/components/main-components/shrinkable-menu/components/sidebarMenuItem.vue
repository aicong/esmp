<style lang="less">
  @import '../styles/menu.less';
</style>

<template>
  <div>
    <menu-item v-if="!menuItem.children" :name="menuItem.name" :key="'menuitem' + menuItem.name">
      <!--<Icon :type="menuItem.icon" :size="iconSize" :key="'menuicon' + menuItem.name"></Icon>-->
      <i :class="menuItem.icon"></i>
      <span class="layout-text" :key="'title' + menuItem.name">{{ itemTitle(menuItem) }}</span>
    </menu-item>
    <Submenu v-if="menuItem.children && menuItem.children.length > 0" :name="menuItem.name" :key="menuItem.name">
      <template slot="title">
        <!--<Icon :type="menuItem.icon" :size="iconSize"></Icon>-->
        <i :class="menuItem.icon" style="margin-top: -3px"></i>
        <span class="layout-text">{{ itemTitle(menuItem) }}</span>
      </template>
      <template v-for="(child, index) in menuItem.children">
        <sidebar-menu-item :menuItem="child" :key="index" class="l-menu"></sidebar-menu-item>
      </template>
    </Submenu>
  </div>
</template>
`
<script>
  export default {
    name: 'sidebarMenuItem',
    props: {
      menuItem: Object,
      iconSize: Number
    },
    methods: {
      itemTitle (item) {
        if (typeof item.title === 'object') {
          return this.$t(item.title.i18n);
        } else {
          return item.title;
        }
      }
    }
  };
</script>
