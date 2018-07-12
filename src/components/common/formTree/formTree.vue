<style lang="scss" scoped>
  .form-tree {
    width: 100%;
    overflow-y: auto;
  }
</style>
<template>
  <div class="form-tree" :style="style">
    <el-tree
      ref="tree"
      :data="treeData"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      @check="handleCheck">
    </el-tree>
  </div>
</template>
<script>
  export default {
    name: 'formTree',
    props: {
      value: {
        required: true,
        type: Array
      },
      treeData: {
        required: true,
        type: Array
      },
      defaultProps: {
        type: Object
      },
      maxHeight: {
        type: Number,
        default: 300
      }
    },
    data () {
      return {
        hasSetDefaultKey: false
      };
    },
    watch: {
      value () {
        if (this.value.length > 0 && !this.hasSetDefaultKey) {
          this.hasSetDefaultKey = true;
          this.$refs.tree.setCheckedKeys(this.value);
        }
      }
    },
    computed: {
      style () {
        return {maxHeight: this.maxHeight + 'px'};
      }
    },
    methods: {
      handleCheck () {
        this.$emit('input', this.$refs.tree.getCheckedKeys(true));
      }
    }
  };
</script>
