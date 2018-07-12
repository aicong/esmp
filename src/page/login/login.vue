<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-page">
      <div class="login-bg"></div>
      <div class="login-logo"></div>
      <div class="login-con">
        <Card :bordered="false">
          <p slot="title" style="padding-top:8px;padding-left:10px;color: #2d8cf0;font-size: 16px;height: 30px">
            <!--承运商运营管理系统-->
            用户登录
          </p>
          <div class="form-con">
            <Form ref="loginForm" :model="form" :rules="rules">
              <FormItem prop="account">
                <i-input v-model="form.account" placeholder="请输入用户名">
                  <span slot="prepend">
                    <Icon :size="18" type="person" color="white"></Icon>
                  </span>
                </i-input>
              </FormItem>
              <FormItem prop="password">
                <i-input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="16" type="locked" color="white"></Icon>
                </span>
                </i-input>
              </FormItem>
              <FormItem>
                <Button @click="handleSubmit" type="primary" long :loading="actionLoading" style="height: 40px">登录</Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </div>
      <div class="login-footer">
        <div class="copy">
          <p>Copyright©2003-2018 长安民生物流 版权所有</p>
          <p>请使用谷歌浏览器访问，使用过程中有任何问题，请拨打服务热线：023-88795537</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { login, currentMenu } from '@/service/login/loginService';
  import qs from 'qs';
  import { mapState, mapMutations } from 'vuex';
  // import { appRouter } from '@/router/router';
  // import Cookies from 'js-cookie';
  // import service from './service';
  // import tool from '@/js/core/utils/tool';
  export default {
    data () {
      return {
        form: {
          account: '',
          password: ''
        },
        rules: {
          account: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    created () {
      // 每次登录之前清理缓存数据
      this._hyTool.removeStore('token', true);
      this._hyTool.removeStore('menuList', true);
      this._hyTool.removeStore('currentUser', true);
    },
    computed: {
      ...mapState([
        'actionLoading'
      ])
    },
    methods: {
      ...mapMutations([
        'LOGIN',
        'SET_TOKEN',
        'IS_MGT'
      ]),
      handleSubmit () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // this._hyTool.cal(true);
            let loginInfo = {};
            loginInfo.account = this.form.account;
            loginInfo.password = this.form.password;
            try {
              login(qs.stringify(loginInfo)).then((result) => {
                this.LOGIN(result.data);
                this.IS_MGT(false);
                this._hyTool.setStore('currentUser', result.data, true);
                this._hyTool.removeStore('mgtUser', true);
                this._hyTool.cal(false);
                this._hyTool.removeStore('isLocked');
                this._hyTool.removeStore('last_page_name');
                // window.location.reload(); // 刷新页面重新获取菜单
                currentMenu().then(res => {
                  let menu = res.data;
                  let menuIds = [];
                  menu.forEach((item) => {
                    if (item.state) {
                      menuIds.push(item.id);
                      item.children.forEach(child => {
                        if (child.state) {
                          menuIds.push(child.id);
                        }
                      });
                    }
                  });
                  this._hyTool.setStore('menuList', menuIds, true); // 保存在localstore  方便菜单权限获取数据
                  this.$router.push('/home');
                });
              }).catch((error) => {
                console.log(error);
              });
            } catch (e) {
              console.log('catch', e);
              this._hyTool.cal(false);
              this.modal_loading = false;
            }
          } else {
            console.log('输入数据错误');
            this.$message.error('输入数据错误');
          }
        });
      }
    }
  };
</script>
