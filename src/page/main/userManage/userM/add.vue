<style lang="scss" scoped>
  .tem-div {
    .c-header {
      background: #fff;
      button {
        margin: 15px 0 15px 15px;
        width: 85px;
        height: 32px;
        border-radius: 0;
      }
    }
    .c-content {
      background: #fff;
      padding: 0 15px;
      overflow: hidden;
      .roleForm {
        padding: 10px;
        .addRole {
          margin-left: -20px;
        }
      }
      h3 {
        font-size: 14px;
        font-weight: 700;
        margin: 0 0 25px 15px;
        padding-bottom: 15px;
        border-bottom: 1px dashed #666;
      }
      .ivu-row {
        height: 55px;
        .ivu-i-col {
          height: 55px;
        }
      }
      .jg-select {
        height: 160px;
      }
      button {
        margin: 1px 5px 25px 0;
        float: right;
        width: 85px;
        height: 32px;
        border-radius: 0;
      }
    }
  }
</style>
<template>
  <div class="tem-div">
    <div class="c-header">
      <Button type="ghost" @click="back">返回</Button>
    </div>
    <div class="c-content">
      <Tabs type="card">
        <TabPane label="基本信息">
          <Form ref="formItem" :model="formItem" :rules="ruleData" :label-width="100">
            <Row>
              <i-col span="9" offset="1">
              <FormItem label="用户名" prop="username">
                <i-input :disabled="disabled" v-model="formItem.username" placeholder="字母开头，由字母数字下划线组成"></i-input>
              </FormItem>
              </i-col>
              <i-col span="9" offset="2">
              <FormItem label="设置登录密码" prop="password">
                <i-input clearable v-model="formItem.password" placeholder="密码为6-20个字符不包含空格且有数字和字母组合"></i-input>
              </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col span="9" offset="1">
              <FormItem label="姓名" prop="realName">
                <i-input clearable v-model="formItem.realName" placeholder="请输入姓名"></i-input>
              </FormItem>
              </i-col>
              <i-col span="9" offset="2">
              <FormItem label="基地名称" prop="baseId">
                <Select clearable transfer filterable v-model="formItem.baseId" placeholder="请选择基地">
                  <Option v-for="item in baseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col span="9" offset="1">
              <FormItem label="用户手机号" prop="phone">
                <i-input clearable v-model="formItem.phone" placeholder="请输入用户手机号"></i-input>
              </FormItem>
              </i-col>
              <i-col span="9" offset="2">
              <FormItem label="邮箱" prop="email">
                <i-input clearable v-model="formItem.email" placeholder="请输入邮箱"></i-input>
              </FormItem>
              </i-col>
            </Row>
            <Row class="jg-select">
              <i-col span="9" offset="1">
              <FormItem label="服务到期日期" prop="expireTime">
                <DatePicker clearable :options="dateoption" transfer placement="bottom-start" v-model="formItem.expireTime" format="yyyy年MM月dd日" type="date" placeholder="请选择时间" style="width: 100%"></DatePicker>
              </FormItem>
              </i-col>
              <i-col span="9" offset="2">
              <FormItem label="性别" prop="sex">
                <i-select v-model="formItem.sex" placeholder="请选择性别">
                  <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </i-select>
              </FormItem>
              </i-col>
            </Row>
            <Row>
              <FormItem>
                <Button type="ghost" @click="back">取消</Button>
                <Button type="primary" @click="upsave('formItem')">保存</Button>
              </FormItem>
            </Row>
          </Form>
        </TabPane>
        <TabPane label="用户角色授权" v-if="isTabPane" inline>
          <Form :model="roleForm" :label-width="70" inline class="roleForm">
            <FormItem label="角色名称">
              <Select v-model="roleForm.roleId" filterable clearable>
                <Option v-for="(item, index) in roleArray" :value="item.id" :key="index">{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="基地名称" prop="baseId">
              <Select v-model="roleForm.baseId" multiple filterable clearable placeholder="请选择基地名称">
                <Option v-for="(item, index) in baseList" :value="item.id" :key="index">{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem class="addRole">
              <Button type="primary" @click="addRole">添加</Button>
            </FormItem>
          </Form>
          <!--表格-->
          <Card class="tem-card" style="width: 962px">
            <!--table部分-->
            <Table border :i-columns="i-columnsTitle" :loading="loading" :data="list"></Table>
            <br>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import {
    createFun,
    updateFun,
    userList,
    roleList,
    getAllRole,
    addRole,
    deleteRole
  } from '@/service/baseManage/userMService';
  import {
    queryList
  } from '@/service/baseManage/baseMService';
  import qs from 'qs';
  export default {
    components: {},
    data () {
      return {
        baseList: [],
        mixins: [list],
        list: [],
        roleArray: [],
        orgArray: [],
        idList: [],
        isTabPane: false,
        caps: true,
        loading: false,
        sexList: [{
            value: 1,
            label: '男'
          },
          {
            value: 2,
            label: '女'
          }
        ],
        roleForm: {
          baseId: []
        },
        dateoption: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now();
          }
        },
        disabled: 'false',
        title: '新增',
        formItem: {
          sex: 1,
          expireTime: '2050-12-31'
        },
        columnsTitle: [{
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            key: 'roleName',
            title: '角色名称',
            width: 210,
            align: 'center'
          },
          {
            key: 'orgName',
            title: '所属基地',
            width: 210,
            align: 'center'
          },
          {
            key: 'createUser',
            title: '创建人',
            width: 140,
            align: 'center'
          },
          {
            key: 'createTime',
            title: '授权时间',
            width: 220,
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
                this._hyTool.createIconBtn(h, params, this.deleteRole, '删除角色', 'trash-a', '', {
                  background: '#ED3F14'
                }, '')
              ]);
            }
          }
        ],
        ruleData: {
          username: [{
              required: true,
              message: '用户名不能为空',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 20,
              message: '用户名为5-20个字符且不包含空格',
              trigger: 'blur change'
            },
            {
              pattern: '^[a-zA-Z][a-zA-Z0-9_]*$',
              message: '字母开头，由字母数字下划线组成',
              trigger: 'blur change'
            }
          ],
          password: [{
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            },
            {
              pattern: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$',
              max: 20,
              message: '密码为6-20个字符不包含空格且有数字和字母组合',
              trigger: 'blur change'
            }
          ],
          realName: [{
              required: true,
              message: '姓名不能为空',
              trigger: 'blur'
            },
            {
              pattern: '^[\u4e00-\u9fa5]{2,5}$',
              message: '姓名为2至5个中文',
              trigger: 'blur change'
            }
          ],
          phone: [
            {
              pattern: '^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\\d{8}$',
              message: '手机号格式不正确',
              trigger: 'blur change'
            }
          ],
          email: [{
            min: 7,
            max: 20,
            message: '邮箱为7-20位',
            trigger: 'blur change'
          }, {
            pattern: '^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\\.[a-zA-Z0-9_-]{2,3}){1,2})$',
            message: '邮箱格式不正确',
            trigger: 'blur change'
          }],
          baseId: [{
            required: true,
            message: '基地不能为空',
            trigger: 'blur change',
            type: 'number'
          }]
        }
      };
    },
    methods: {
      back () {
        this.$router.go(-1);
      },
      // 新增和修改按钮
      upsave (name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            const payload = Object.assign({}, this.formItem);
            for (var key in payload) {
              if (!payload[key]) {
                delete payload[key];
              }
            }
            delete payload.cityId;
            delete payload.provinceId;
            payload.expireTime = new Date(payload.expireTime);
            if (payload.expireTime) {
              payload.expireTime = this._hyTool.DateFormat(payload.expireTime, 'yyyy-MM-dd hh:mm:ss');
            }
            const res = this.$route.query;
            if (res.id) {
              this.title = '编辑';
              this.loading = true;
              await updateFun({
                id: res.id
              }, payload);
              this.loading = false;
            } else {
              this.title = '新增';
              this.loading = true;
              await createFun(payload);
              this.loading = false;
            }
            this.$Notice.success({
              title: this.title + '成功'
            });
            this.$router.push('/userManage/user');
          } else {
            this.$Notice.warning({
              title: '信息未填写完整'
            });
          }
        });
      },
      // 获取基地信息
      _getList () {
        queryList().then((res) => {
          const allList = res.data;
          allList.forEach(item => {
            if (item.disabled === false) {
              this.baseList.push(item);
            }
          });
        });
      },
      // 编辑页面获取单个员工信息
      async getUser () {
        this.title = '编辑';
        const res = this.$route.query;
        if (res.id) {
          this.isTabPane = true;
          delete this.ruleData.password[0];
          const result = await userList();
          result.data.forEach((item, index) => {
            if (item.id === parseInt(res.id)) {
              this.formItem = item;
              this.disabled = true;
            }
          });
          // 通过用户id获取角色列表
          const roleResult = await roleList({
            userId: res.id
          });
          this.list = roleResult.data;
          // 获取所有角色列表
          const allRole = await getAllRole();
          this.roleArray = allRole.data;
        }
      },
      // 添加角色
      addRole () {
        this.caps = true;
        const roleId = this.roleForm.roleId;
        const userId = this.$route.query.id;
        if (roleId && this.roleForm.baseId.length > 0) {
          // 拿到列表基地、角色id数组
          this.list.forEach(item => {
            this.idList.push(item.roleId);
            this.orgArray.push(item.orgId);
          });
          // 判断下拉选项是否存在和数组重复
          let roleBlean = this.idList.indexOf(roleId);
          let orgBlean = this.orgArray.filter(item => {
            return this.roleForm.baseId.includes(item);
          });
          if (roleBlean !== -1 && orgBlean.length > 0) {
            this.caps = false;
          }
          if (this.caps) {
            const baseId = this.roleForm.baseId.join(',');
            addRole({
              roleId: roleId
            }, qs.stringify({
              userId: userId,
              baseId: baseId
            })).then(res => {
              if (res.result) {
                this.getUser();
              }
              this.roleForm.roleId = null;
              this.roleForm.baseId = [];
              this.$Notice.success({
                title: '绑定角色成功'
              });
            });
          } else {
            this.$Notice.error({
              title: '该用户已绑定相同的角色或基地'
            });
          }
        } else {
          this.$Notice.error({
            title: '请先选择角色和基地'
          });
        }
      },
      // 删除角色
      deleteRole (params) {
        this.caps = true;
        this.$Modal.confirm({
          title: '删除角色',
          content: '是否删除此角色',
          onOk: async () => {
            const id = params ? params.roleId : null;
            const userId = this.$route.query.id;
            deleteRole({
              id: id
            }, qs.stringify({
              userId: userId,
              baseId: params.orgId
            })).then(res => {
              if (res.result) {
                this.getUser();
              }
            });
            this.$Notice.success({
              title: '删除成功'
            });
          },
          onCancel: () => {
            this.$Message.info('已取消操作');
          }
        });
      }
    },
    created () {
      this.disabled = false;
      this._getList();
      this.getUser();
    }
  };
</script>
