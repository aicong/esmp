<style lang="less">
</style>
<template>
  <Dropdown placement="right-start" @on-click="changeMenu">
    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text" v-if="item.icon !== 'normal'">
      <i :class="item.icon" v-if="item.icon !== 'normal'"></i>
    </Button>
    <div v-else class="ivu-dropdown-item">
      <span style="padding-left: 13px;">{{item.title}}</span>
      <Icon type="chevron-right" style="float: right"></Icon>
    </div>
    <DropdownMenu slot="list" v-if="item.children && item.children.length > 0">
      <template v-for="(child, i) in item.children">
        <template v-if="!child.children">
          <DropdownItem :name="child.name" :key="i">
            <Icon :type="child.icon"></Icon>
            <span style="padding-left:10px;">{{ itemTitle(child) }}</span>
          </DropdownItem>
        </template>
        <sidebar-menu-shrink-item v-else :item="child" :key="i"></sidebar-menu-shrink-item>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
  export default {
    name: 'sidebarMenuShrinkItem',
    props: {
      item: Object,
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
