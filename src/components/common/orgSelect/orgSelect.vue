<style lang="scss" scoped>
</style>
<template>
  <Input v-if="disabled" disabled v-model="inStr"/>
  <Poptip v-else placement="bottom" v-model="showPoptip" style="width: 100%;">
    <Input ref="pId" v-model="inStr" @on-focus="handlerFocus" @on-blur="handlerBlur" @on-change="handlerChange" :placeholder="placeholderStr"/>
    <div class="api" ref="tree" slot="content" style="text-align: left;">
      <Tree :data="treeCopy" @on-select-change="handleSelectTree"></Tree>
    </div>
  </Poptip>
</template>
<script>
  export default {
    name: 'HyOrgSelect',
    data () {
      return {
        showPoptip: false,
        placeholderStr: '',
        inStr: '',
        tree: [],
        treeCopy: [],
        selectNode: {
          title: '',
          id: ''
        }
      };
    },
    props: {
      value: [String, Number],
      data: {
          type: Array,
          default: []
      },
      label: String,
      placeholder: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },
    created () {
      this.tree = this.data;
      this.treeCopy = this.data;
      this.placeholderStr = this.placeholder;
    },
    methods: {
      handlerBlur () {
        if (this.inStr) {
          if (this.selectNode.title && this.selectNode.title !== '') {
            this.inStr = this.selectNode.title;
            this.$emit('input', this.selectNode.id);
          } else {
            this.inStr = '';
            this.$emit('input', '');
          }
        } else {
          this.selectNode = {};
          this.inStr = '';
          this.$emit('input', '');
        }
      },
      handlerFocus () {
        this.treeCopy = this._hyTool.deepCopy(this.tree);
        // 获取父级节点文本框宽度
        let inputWidth = this.$refs.pId.$el.offsetWidth;
        // 设置树div宽度
        this.$refs.tree.style.width = inputWidth - 32 + 'px';
      },
      handleSelectTree (node) {
        this.inStr = node[0].title;
        let value = node[0].id;
        this.selectNode = node[0];
        this.$emit('input', value);
        if (this.$parent.prop) {
          this.$parent.form.validateField(this.$parent.prop);
        }
        this.$emit('get-selectNode', node[0]);
        this.showPoptip = false;
      },
      handlerChange () {
        // 过滤树节点
        if (this.inStr) {
          // 键盘输入重复执行问题解决
          this.debounce(500, () => {
            this.treeCopy = this._hyTool.deepCopy(this.tree);
            this.treeCopy = this._hyTool.filterTreeData(this, this.treeCopy, this.inStr);
          });
        } else {
          this.treeCopy = this._hyTool.deepCopy(this.tree);
        }
      },
      debounce (time, action) {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.timer = setTimeout(() => {
          action && action();
        }, time);
      },
      findChild (cb) {
        let _this = this;
        const find = function (child) {
          if (child.id === _this.value || child.title === _this.label) {
            cb(child);
          }
          if (child.children.length) {
            child.children.forEach((innerChild) => {
              find(innerChild, cb);
            });
          }
        };
        if (this.treeCopy.length) {
          this.treeCopy.forEach((child) => {
            find(child);
          });
        }
      },
      updateOptions () {
        let options = [];
        this.findChild((child) => {
          options.push(child);
        });
        return options[0];
      }
    },
    watch: {
      data: function (oldData) {
        this.tree = oldData;
        this.treeCopy = oldData;
      },
      value: function (val) {
        if (val || (this.label && this.label !== '')) {
          let selectNode = this.updateOptions();
          if (selectNode) {
            this.selectNode = selectNode;
            this.inStr = selectNode.title;
            this.$emit('input', selectNode.id);
          } else if (this.label !== '') {
            this.selectNode = {id: val, title: this.label};
            this.inStr = this.label;
            this.$emit('input', val);
          }
        } else {
          this.selectNode = {};
          this.inStr = '';
          this.$emit('input', '');
        }
      },
      label: function (val) {
        this.inStr = val;
      }
    }
  };
</script>
