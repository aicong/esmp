<template>
  <div style="width: 60px;">
    <template v-for="(item, index) in menuList">
      <sidebar-menu-shrink-item :item="item" :key="index" @on-change="changeMenu"></sidebar-menu-shrink-item>
    </template>
  </div>
</template>

<script>
  import sidebarMenuShrinkItem from './sidebarMenuShrinkItem';

  export default {
    name: 'sidebarMenuShrink',
    components: {
      sidebarMenuShrinkItem
    },
    props: {
      menuList: {
        type: Array
      },
      iconColor: {
        type: String,
        default: 'white'
      },
      menuTheme: {
        type: String,
        default: 'darck'
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
    }
  };
</script>
