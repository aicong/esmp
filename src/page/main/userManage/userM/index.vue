<style lang="scss" scoped>

</style>
<template>
  <div class="tem-div">
    <!--搜索-->
    <Card class="tem-card">
      <div class="search-item" :style="searchItemStyle">
        <Form ref="searchForm" label-position="right" :label-width="60" inline class="frm-search">
          <FormItem label="用户名">
            <i-input clearable placeholder="用户名" v-model="searchData.usernameLk"></i-input>
          </FormItem>
          <FormItem label="姓名">
            <i-input clearable placeholder="姓名" v-model="searchData.realNameLk"></i-input>
          </FormItem>
          <FormItem label="手机号">
            <i-input clearable placeholder="手机号" v-model="searchData.phoneLk" :maxlength="11"></i-input>
          </FormItem>
          <FormItem label="邮箱">
            <i-input clearable placeholder="邮箱" v-model="searchData.emailLk" :maxlength="11"></i-input>
          </FormItem>
          <FormItem label="启用状态">
            <Select clearable v-model="searchData.banned">
                <Option v-for="item in statusArray" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
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
    <Card class="tem-card">
      <!-- 按钮 -->
      <Button icon="plus" type="ghost" @click="adduser">新增</Button>
      <!-- <Button icon="archive" type="ghost">导出</Button> -->
    </Card>
    <Card class="tem-card">
      <!--table部分-->
      <Table border :columns="columnsTitle" :loading="loading" :data="list"></Table>
      <br>
      <!-- 分页 -->
      <Page :total="totalElement" size="small" show-elevator show-sizer show-total :current="searchData.pageNo" style="text-align: right;" @on-change="currentChange" @on-page-size-change="pageSizeChange" :page-size-opts="pageSizeOpts" v-show="pageShow"></Page>
    </Card>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import {
    userList,
    count,
    detain,
    nodetain
  } from '@/service/baseManage/userMService';
  export default {
    components: {},
    mixins: [list],
    data () {
      return {
        loading: false,
        upPwdModalShow: false,
        columnsTitle: [{
            key: 'index',
            width: 60,
            align: 'center',
            render: (h, params) => {
              // 每行索引值
              return h('div', params.index + (this.searchData.pageNo - 1) * this.searchData.pageSize + 1);
            }
          },
          {
            key: 'username',
            title: '用户名',
            align: 'center',
            width: 180
          },
          {
            key: 'realName',
            title: '姓名',
            align: 'center',
            width: 160
          },
          {
            title: '状态',
            key: 'banned',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Tag', {
                  props: {
                    color: this.color(params),
                    size: 'small'
                  }
                }, params.row.banned)
              ]);
            }
          },
          {
            title: '最近登陆时间',
            key: 'activeTime',
            align: 'center',
            width: 180
          },
          {
            key: 'sex',
            title: '性别',
            align: 'center',
            width: 90
          },
          {
            title: '手机号',
            key: 'phone',
            align: 'center',
            width: 160
          },
          {
            title: '邮箱',
            key: 'email',
            align: 'center',
            width: 190
          },
          {
            title: '服务到期日期',
            align: 'center',
            key: 'expireTime',
            width: 150
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center',
            width: 180
          },
          {
            title: '创建人',
            key: 'createUser',
            align: 'center',
            width: 110
          },
          {
            title: '操作',
            fixed: 'right',
            align: 'center',
            width: 130,
            disabled: 'disabled',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIconBtn(h, params, this.edit, '编辑', 'ios-compose-outline', '', {
                  background: '#319ce2'
                }, 'userEdit'),
                this._hyTool.createIconBtn(h, params, this.changeStatus, '启用状态', params.row.banned === '禁用' ? 'unlocked' : 'locked', '', {
                  background: '#ED3F14'
                })
              ]);
            }
          }
        ],
        statusArray: [{
            value: '1',
            label: '禁用'
          },
          {
            value: '0',
            label: '启用'
          }
        ]
      };
    },
    mounted () {
      // this._getCount();
    },
    methods: {
      async _getList () {
        try {
          this.loading = true;
          if (this.isSearchClick) { // 点击搜索按钮改变查询条件
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
          const result = await userList(this.cacheSearchData);
          await this._getCount(this.cacheSearchData);
          this.list = result.data || [];
          this.list.forEach(item => {
            switch (item.banned) {
              case false:
                item.banned = '启用';
                break;
              case true:
                item.banned = '禁用';
                break;
              default:
                item.banned = '--';
                break;
            };
            switch (item.role) {
              case 'staff':
                item.role = '员工';
                break;
              case 'admin':
                item.role = '管理员';
                break;
              default:
                item.role = '--';
                break;
            };
            switch (item.sex) {
              case 0:
                item.sex = null;
                break;
              case 1:
                item.sex = '男';
                break;
              case 2:
                item.sex = '女';
                break;
              default:
                item.sex = '--';
                break;
            }
          });
          this.isSearchClick = false;
          this.loading = false;
        } catch (e) {
          this.loading = false;
          this.list = [];
          this.totalElement = 0;
        }
      },
      async _getCount (searchData) {
        const result = await count(searchData);
        this.totalElement = result.data || 0;
      },
      // 新增用户
      adduser () {
        this.$router.push({
          name: 'userAdd'
        });
      },
      // 编辑
      edit (params) {
        if (params.banned === '禁用') {
          this.$Notice.warning({
            title: '此用户已被禁用不允许修改'
          });
          return;
        }
        const id = params ? params.id : null;
        this.$router.push({
          path: '/userManage/user/add',
          query: {
            id: id
          }
        });
      },
      // 启用状态
      changeStatus (params, index) {
        this.$Modal.confirm({
          title: '启用状态',
          content: params.banned === '启用' ? '是否禁用此用户' : '是否启用此用户',
          onOk: async () => {
            if (params.banned === '启用') {
              await detain({
                'id': params.id
              });
              this.$Notice.success({
                title: '禁用用户成功'
              });
              this._getList();
            } else {
              await nodetain({
                'id': params.id
              });
              this.$Notice.success({
                title: '启用用户成功'
              });
              this._getList();
            }
          },
          onCancel: () => {
            this.$Message.info('已取消操作');
          }
        });
      },
      color (params) {
        if (params.row.banned === '启用') {
          return 'blue';
        } else if (params.row.banned === '禁用') {
          return '#999';
        }
      }
    },
    computed: {}
  };
</script>
