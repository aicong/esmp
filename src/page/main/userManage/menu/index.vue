<template>
  <div class="tem-div">
    <!--搜索-->
    <Card class="tem-card">
      <div class="search-item">
        <Form ref="searchForm" class="frm-search" label-position="right" inline :label-width="60">
          <FormItem label="菜单名称">
            <i-input placeholder="角色名称" v-model="searchData.name"></i-input>
          </FormItem>
        </Form>
      </div>
      <div class="search-btn">
        <span class="search-more" @click="changeSearchDiv" v-show="searchShow">
          <Icon :type="searchDiv == true?'chevron-up':'chevron-down'" :size="10"></Icon> {{searchFont}}
        </span>
        <Button type="primary" @click="search(1)" icon="search" :loading="searchListLoading">搜索</Button>
        <Button class="search-btn-plus" type="ghost" v-btnAuth="{code: 'userAdd'}" icon="plus"
                @click="showModal('add')">新增
        </Button>
      </div>
    </Card>
    <!--按钮-->
    <Card class="tem-card">
      <div style="text-align: left">
        <i-button @click="showModal('add')">新增</i-button>
        <i-button @click="showModal('modify')">编辑</i-button>
        <i-button @click="showModal('delete')">删除</i-button>
      </div>
    </Card>
    <!--表格-->
    <Card class="tem-card">
      <!--table部分-->
      <Table :columns="columnsTitle" :loading="searchListLoading" :data="list" @on-selection-change="handleSelectionChange"></Table>
      <br>
      <!-- 分页 -->
      <Page :total="totalElement"
            size="small"
            show-elevator
            show-sizer
            show-total
            style="text-align: right;"
            @on-change="search"
            @on-page-size-change="pageSizeChange"
            :page-size-opts="pageSizeOpts"
      ></Page>
    </Card>
    <!--弹出框-->
    <Modal v-model="modalObj.addOrModify" :mask-closable="false">
      <p slot="header">
        <span>{{modalObj.title}}</span>
      </p>
      <div style="text-align:center">
        <Form ref="form" :model="modalFormData" :rules="ruleValidate" :label-width="80">
          <hy-form-item :form="modalFormData" :formRow="modalFormItem"></hy-form-item>
        </Form>
      </div>
      <div slot="footer">
        <i-button type="success" size="large" :loading="actionLoading" @click="addOrUp('form')">确定</i-button>
        <i-button size="large" @click="modalObj.addOrModify = false">取消</i-button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import fetch from './service';
  import list from '@/js/mixins/list';
  import HyFormItem from '@/components/common/formItem/formItem.vue';

  export default {
    components: {
      HyFormItem
    },
    mixins: [list],
    data () {
      return {
        loading: false,
        // 查询条件
        searchObj: {},
        modalObj: {
          title: '',
          addOrModify: false
        },
        columnsTitle: [
          {
            type: 'selection',
            // type: 'index',
            width: 60,
            align: 'center'
          },
          {
            key: 'name',
            title: '角色',
            width: 120
          },
          {
            key: 'remarks',
            title: '备注'
          },
          {
            title: '操作',
            key: 'action',
            width: 80,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIconBtn(h, params, this.editItem, '编辑', 'ios-compose-outline', '', {background: '#319ce2'}, 'userEdit')
              ]);
            }
          }
        ],
        modalFormData: {
          name: '',
          remarks: ''
        },
        modalFormItem: [
          {
            key: 'name',
            title: '角色名字'
          },
          {
            key: 'remarks',
            title: '备注',
            type: 'textarea'
          }
        ],
        ruleValidate: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'},
            {max: 20, message: '角色名称不能超过20个字符且不包含空格', trigger: 'blur'}
          ],
          remarks: [
            {max: 200, message: '备注不能超过200个字符且不包含空格', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      _getList () {
        // 作用合并搜索条件
        fetch.getList(Object.assign(this.searchData, this.searchObj)).then(this.callback);
      },
      clearFormValid () {
        this.$refs.form.resetFields();
      },
      getOneData (data) {
        this.modalFormData = this._hyTool.deepCopy(data);
      },
      addOrUp (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this._hyTool.cal(true);
            try {
              if (this.modalObj.title === '新增') {
                fetch.saveApi(this.modalFormData).then((data) => {
                  this.$Notice.success({
                    title: '新增成功'
                  });
                  this.search();
                });
              } else {
                let opt = {id: this.modalFormData.id};
                fetch.updateApi(opt, this.modalFormData).then((data) => {
                  this.$Notice.success({
                    title: '修改成功'
                  });
                  this.search();
                });
              }
            } catch (e) {}

            this.modalObj.addOrModify = false;
            this._hyTool.cal(false);
          }
        });
      },
      deleteRole (row) {
        this.$Modal.confirm({
          title: '提示',
          content: '是否删除角色：' + row.name,
          onOk: () => {
            let payload = {id: row.id};
            fetch.deleteApi(payload).then((data) => {
              this.$Notice.success({title: '删除成功'});
              this.search();
            });
          }
        });
      }
    }
  };
</script>

<style scoped>
</style>
