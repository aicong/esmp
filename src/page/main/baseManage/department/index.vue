/**
* 描述：基础信息 - 部门管理
*/
<style lang="scss" scoped>
</style>
<template>
  <div class="tem-div">
    <!--搜索-->
    <Card class="tem-card">
      <div class="search-item" :style="searchItemStyle">
        <Form ref="searchForm" class="frm-search" label-position="right" inline :label-width="60">
          <FormItem label="部门名称">
            <i-input clearable placeholder="部门名称" v-model="searchData.nameLk"></i-input>
          </FormItem>
        </Form>
      </div>
      <div class="search-btn">
        <span class="search-more" @click="changeSearchDiv" v-show="searchShow">
          <Icon :type="searchDiv == true?'chevron-up':'chevron-down'" :size="10"></Icon> {{searchFont}}
        </span>
        <!-- <Button type="primary" @click="rest" icon="android-refresh" :loading="loading">重置</Button> -->
        <Button type="primary" @click="search(1)" icon="search" :loading="loading">搜索</Button>
      </div>
    </Card>
    <!--按钮-->
    <Card class="tem-card">
      <div style="text-align: left">
        <Button class="search-btn-plus" type="ghost" icon="plus" @click="addOrUpdate()">新增部门</Button>
      </div>
    </Card>
    <!--表格-->
    <Card class="tem-card">
      <!--table部分-->
      <Table border :columns="columnsTitle" :loading="loading" :data="list" @on-selection-change="handleSelectionChange"></Table>
      <br>
      <!-- 分页 -->
      <Page :total="totalElement"
            size="small"
            show-elevator
            show-sizer
            show-total
            style="text-align: right;"
            :current="searchData.pageNo"
            @on-change="currentChange"
            @on-page-size-change="pageSizeChange"
            :page-size-opts="pageSizeOpts"
            v-show="pageShow"
      ></Page>
    </Card>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import { queryList, count, deleteFun } from '@/service/baseManage/departmentService';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  export default {
    mixins: [list],
    components: {
      HyFormItem
    },
    data () {
      return {
        loading: false,
        // 查询条件
        searchObj: {},
        modal: {
          title: '',
          bindModalShow: false
        },
        columnsTitle: [
          {
            type: 'index',
            width: 60,
            align: 'center',
            render: (h, params) => {
              // 每行索引值
              return h('div', params.index + (this.searchData.pageNo - 1) * this.searchData.pageSize + 1);
            }
          },
          {
            key: 'name',
            title: '部门名称'
          },
          {
            key: 'createUser',
            title: '创建人'
          },
          {
            key: 'createTime',
            title: '创建日期'
          },
          {
            title: '操作',
            key: 'action',
            width: 250,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIconBtn(h, params, this.addOrUpdate, '编辑', 'ios-compose-outline', '', {background: '#319ce2'}, 'userEdit'),
                this._hyTool.createIconBtn(h, params, this.delFun, '删除', 'ios-trash', '', {background: '#ED3F14'}, '')
              ]);
            }
          }
        ]
      };
    },
    mounted () {
      this._getCount();
    },
    methods: {
      async _getList () {
        try {
          this.loading = true;
          if (this.isSearchClick) {  // 点击搜索按钮改变查询条件
            this.cacheSearchData = Object.assign({}, this.searchData);
          } else { // 点击分页部分使用上一次查询条件
            this.cacheSearchData.pageNo = this.searchData.pageNo;
            this.cacheSearchData.pageSize = this.searchData.pageSize;
          }
          for (const key in this.cacheSearchData) {
            if (!this.cacheSearchData[key]) {
              delete this.cacheSearchData[key];
            }
          }
          const result = await queryList(this.cacheSearchData);
          await this._getCount(this.cacheSearchData);
          this.list = result.data || [];
          this.isSearchClick = false;
          this.loading = false;
        } catch (e) {
          this.loading = false;
          this.list = [];
          this.totalElement = 0;
        }
      },
      async _getCount () {
        const result = await count();
        this.totalElement = result.data || 0;
      },
      addOrUpdate (row) {
        const id = row ? row.id : null;
        this.$router.push({path: '/baseManage/department/edit', query: {id: id}});
      },
      delFun (row) {
        this.$Modal.confirm({
          title: '提示',
          content: '确认删除？',
          onOk: async () => {
            try {
              const opt = {id: row.id};
              await deleteFun(opt);
              this.$Notice.success({title: '删除成功'});
              this.search();
            } catch (e) {
              this.$Notice.error({title: '删除异常'});
            }
          }
        });
      }
    }
  };
</script>
