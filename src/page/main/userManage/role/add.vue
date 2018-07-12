<style lang="less" scoped>
  .ivu-poptip-rel{
    width: 100%;
  }
  .tem-card .ivu-form-item{
    margin-bottom: 24px;
  }
  .ivu-input-number{
    width: 100%;
  }
  .tem-card  .ivu-form-item  .ivu-select-selection{
    width: 100%;
  }
   .tem-div {
    .c-header {
      background: #fff;
      button {
        margin: 15px 0 15px 15px;
        width: 85px;
      }
    }
    .c-content {
      background: #fff;
      padding-right: 10px;
      overflow: hidden;
      h3 {
        font-size: 14px;
        font-weight: 700;
        margin: 0 0 25px 15px;
        padding-bottom: 15px;
        border-bottom: 1px dashed #666;
      }
      .ivu-row {
        height: 55px;
        .ivu-col {
          height: 55px;
        }
      }
      .jg-select {
        height: 160px;
      }
      button {
        margin: 0 5px 25px 0;
        float: right;
      }
    }
  }
  .tabspage {
    margin-bottom: 16px;
    margin-left: 15px;
    margin-top: 15px;
}
</style>
<template>
  <div class="tem-div">
    <div class="c-header">
      <Button type="ghost" v-go-back>返回</Button>
    </div>
    <div class="c-content">
      <Tabs type="card" class="tabspage">
        <TabPane label="基本信息">
          <Card class="tem-card">
            <el-form ref="roleForm" :model="roleForm" label-width="120px" :rules="ruleValidate" style="width: 550px" size="small">
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="roleForm.name" placeholder="角色名称"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" prop="intro">
                <el-input v-model="roleForm.intro" placeholder="角色简介" type="textarea" :maxRows=5 clearable></el-input>
              </el-form-item>
              <el-form-item label="权限分配" prop="privileges" :show-message="roleForm.privileges.length === 0">
                <form-tree
                  v-model="roleForm.privileges"
                  :treeData="privilegesData"
                  :defaultProps="defaultProps"
                  node-key="index"
                  default-expand-all
                  :maxHeight="350">
                </form-tree>
              </el-form-item>
            </el-form>
          </Card>
          <Card class="tem-card">
            <Button type="ghost" v-go-back style="margin-left: 8px">取消</Button>
            <Button type="primary"  @click="save('roleForm')">保存</Button>
          </Card>
        </TabPane>
        <TabPane label="已授权用户" v-if="isTabPane">
          <Form ref="formUser" :model="formUser" :rules="authorizeValidate"  :label-width="80" inline>
            <FormItem label="用户名" prop="userId">
                <Select v-model="formUser.userId" filterable clearable placeholder="请输入用户名关键字查询">
                    <Option v-for="(item, index) in UserList" :value="item.id" :key="index">{{item.realName}}</Option>
                </Select>
            </FormItem>
            <FormItem label="基地名称" prop="baseId">
                <Select v-model="formUser.baseId" multiple filterable clearable placeholder="请输入关键字查询">
                  <Option v-for="(item, index) in baseList" :value="item.id" :key="index">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="authorizeFun('formUser')">添加</Button>
            </FormItem>
          </Form>
          <!--表格-->
          <Card class="tem-card"  style="width: 800px">
            <!--table部分-->
            <Table border stripe :columns="columnsTitle" :loading="loading" :data="list"></Table>
            <br>
            <!-- 分页 -->
            <Page :total="totalElement"
                  size="small"
                  show-elevator
                  show-sizer
                  show-total
                  style="text-align: right;"
                  :current="pageNo"
                  @on-change="currentChange"
                  @on-page-size-change="pageSizeChange"
                  :page-size-opts="pageSizeOpts"
                  v-show="pageShow"
            ></Page>
          </Card>
        </TabPane>
    </Tabs>

    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import { getById, createFun, updateFun, userList, baseList, byRoleList, byRoleCount, authorizeFun, revokeFun } from '@/service/userManage/roleMService';
  import formTree from '@/components/common/formTree/formTree';
  import qs from 'qs';
  export default {
    // mixins: [list],
    components: {
      formTree
    },
    data () {
      return {
        roleid: '',
        totalElement: 120,
        pageNo: 1,
        pageSizeOpts: [10, 20, 50, 100],
        pageSize: 10,
        pageShow: false,
        title: '',
        isTabPane: false,
        isUpate: false,
        loading: false,
        userloading: false,
        flag: false,
        UserList: [],
        baseList: [],
        roleForm: {
          privileges: []
        },
        list: [],
        ruleValidate: {
          name: [
            {required: true, message: '角色名称不能为空', trigger: 'blur'},
            {pattern: '^[^\\s]{0,12}$', message: '角色名称不能超过12个字符且不包含空格', trigger: 'blur'}
          ],
          intro: [
            {pattern: '^[^\\s]{0,40}$', message: '角色描述不能超过40个字符且不包含空格', trigger: 'blur'}
          ],
          privileges: [
            {required: true, type: 'array', message: '权限分配不能为空', trigger: 'blur change'}
          ]
        },
        authorizeValidate: {
            userId: [
              {required: true, type: 'number', message: '用户名不能为空', trigger: 'blur change'}
            ],
            baseId: [
              {required: true, type: 'array', message: '基地不能为空', trigger: 'blur change'}
            ]
        },
        privileges: '',
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        formUser: {
          userId: '',
          baseId: []
        },
        columnsTitle: [
          {
            key: 'index',
            width: 60,
            align: 'center',
            render: (h, params) => {
              return h('div', params.index + (this.pageNo - 1) * this.pageSize + 1);
            }
          },
          {
            key: 'username',
            title: '用户名',
            align: 'center'
          },
          {
            key: 'userName',
            title: '姓名',
            align: 'center'
          },
          {
            key: 'orgName',
            title: '所属基地',
            align: 'center'
          },
          {
            key: 'createUser',
            title: '创建人',
            align: 'center'
          },
          {
            key: 'createTime',
            title: '授权时间',
            width: 170,
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIconBtn(h, params, this.revokeFun, '移除', 'ios-trash', '', {background: '#ED3F14'}, '')
              ]);
            }
          }
        ]
      };
    },
    computed: {
      ...mapState([
        'privilegesData'
      ])
    },
    async created () {
      await this.roleMenu();
      this.roleid = this.$route.query.id;
      if (this.roleid) {
        this.isUpate = true;
        this.isTabPane = true;
        await this.init(this.roleid);
        this.getUserList().then(res => {
          this.getbaseList();
          this._getCount();
          this.getroleList();
          this.isUpate = false;
        });
      }
    },
    methods: {
      ...mapActions([
        'roleMenu'
      ]),
      async init (id) {
        this.title = '编辑';
        const result = await getById({id: id});
        const data = result.data || [];
        this.roleForm = {
          name: data.name,
          intro: data.intro,
          tenantId: data.tenantId,
          privileges: data.privileges
        };
      },
      async getUserList () {
        const result = await userList();
        result.data.forEach(item => {
            if (item.banned === false) {
              this.UserList.push(item);
            }
          });
      },
      async getbaseList () {
        const result = await baseList();
        result.data.forEach(item => {
          if (item.disabled === false) {
            this.baseList.push(item);
          }
        });
    },
      save (name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            const res = this.$route.query;
            const payload = Object.assign({}, this.roleForm);
              if (!res.id) {
                  this.title = '新增';
                  createFun(payload).then(res => {
                    if (res.error) {
                      this.$Notice.warning({
                        title: '' + res.message
                      });
                    }
                    this.$Notice.success({
                      title: payload.name + '' + this.title + '成功'
                    });
                    this.$router.push({name: 'role'});
                });
              } else {
                  this.title = '修改';
                  await updateFun({id: res.id}, payload);
                  this.$Notice.success({
                    title: payload.name + '' + this.title + '成功'
                  });
                  this.$router.push({name: 'role'});
              }
          } else {
            this.$Notice.warning({
              title: '信息未填写完整'
            });
          }
        });
      },
      // 角色的授权用户列表
      async getroleList () {
        try {
          this.loading = true;
          const payload = {pageNo: this.pageNo, pageSize: this.pageSize};
          let result = await byRoleList({'roleId': this.roleid}, payload);
          await this._getCount();
          let userlist = this.UserList;
          result.data.forEach(item => {
            let pac = userlist.find(p => p.id === item.userId);
            item['username'] = pac.username;
          });
          this.list = result.data;
          this.loading = false;
        } catch (e) {
          this.loading = false;
          this.list = [];
        }
      },
      async _getCount (searchData) {
        const result = await byRoleCount({'roleId': this.roleid});
        if (result.data > 0) {
          this.pageShow = true;
        }
        this.totalElement = result.data || 0;
      },
      authorizeFun (name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            let orgArray = [];
            this.list.forEach(item => {
              orgArray.push(item.orgId);
            });
            // 判断下拉选项是否存在和数组重复
            let orgBlean = orgArray.filter(item => {
              return this.formUser.baseId.includes(item);
            });
            if (orgBlean.length > 0) { // 提示添加已经存在的用户和基地
              this.$Notice.warning({title: '该用户已绑定相同基地'});
              return;
            }
            const payload = Object.assign({}, this.formUser);
            payload.baseId = payload.baseId.join(',');
            authorizeFun({'roleId': this.roleid}, qs.stringify(payload)).then(res => {
              if (res.result) {
                  this.getroleList();
                  this.$refs[name].resetFields();
              }
            });
          }
        });
      },
      revokeFun (row) {
        this.$Modal.confirm({
          title: '提示',
          content: '确认删除？',
          onOk: async () => {
            try {
              revokeFun({'id': this.roleid}, qs.stringify({'userId': row.userId, 'baseId': row.orgId})).then(res => {
                if (res.result) {
                  this.$Notice.success({title: '删除成功'});
                  this.pageNo = 1;
                  this.getroleList();
                }
              });
            } catch (e) {
              this.$Notice.error({title: '删除异常'});
            }
          }
        });
      },
      currentChange (val) {
        this.pageNo = val;
        // 获取列表
        this.getroleList();
      },
      pageSizeChange (pageSize) {
        this.pageSize = pageSize;
        // 获取列表
        this.getroleList();
      }
    }
  };
</script>
