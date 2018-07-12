<style lang="scss" scoped>
  .tem-div {
    padding: 10px;
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
      padding-right: 10px;
      overflow: hidden;
      h3 {
        font-size: 14px;
        font-weight: 700;
        margin: 0 0 25px 15px;
        padding-top: 15px;
        padding-left: 10px;
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
        margin: 0 5px 25px 0;
        float: right;
        border-radius: 0;
        width: 85px;
        height: 32px;
      }
    }
  }
</style>
<template>
  <div class="tem-div">
    <div class="c-content">
      <h3>修改密码</h3>
      <Form ref="formItem" :model="formItem" :rules="ruleData" :label-width="110">
        <Row>
          <i-col span="9" offset="1">
          <FormItem label="旧密码" prop="oldPassword">
            <i-input type="password" v-model="formItem.oldPassword" placeholder="请输入旧密码"></i-input>
          </FormItem>
          </i-col>
          <i-col span="9" offset="2">
          </i-col>
        </Row>
        <Row>
          <i-col span="9" offset="1">
          <FormItem label="新密码" prop="newPassword">
            <i-input type="password" v-model="formItem.newPassword" placeholder="请输入新密码"></i-input>
          </FormItem>
          </i-col>
          <i-col span="9" offset="2">
          </i-col>
        </Row>
        <Row>
          <i-col span="9" offset="1">
          <FormItem label="确认新密码" prop="newPasswordCheck">
            <i-input type="password" v-model="formItem.newPasswordCheck" placeholder="请再次输入新密码"></i-input>
          </FormItem>
          </i-col>
          <i-col span="9" offset="2">
          </i-col>
        </Row>
        <Row>
          <i-col span="9" offset="1">
          <FormItem>
            <!-- <Button type="ghost" @click="back">取消</Button> -->
            <Button type="primary" @click="upsave('formItem')">修改</Button>
          </FormItem>
          </i-col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import { updatePassword } from '@/service/userManage/passwordService';
  import qs from 'qs';
  export default {
    components: {},
    data () {
      return {
        formItem: {},
        ruleData: {
          oldPassword: [
            {
              required: true,
              message: '旧密码不能为空',
              trigger: 'blur'
            },
            {
              pattern: '^\\S{6,20}$',
              message: '密码为6-20位',
              trigger: 'blur change'
            }
          ],
          newPassword: [
            {
              required: true,
              message: '新密码不能为空',
              trigger: 'blur'
            },
            {
              pattern: '^\\S{6,20}$',
              message: '密码为6-20位',
              trigger: 'blur change'
            }
          ],
          newPasswordCheck: [
            {
              required: true,
              message: '确认新密码不能为空',
              trigger: 'blur'
            },
            {
              pattern: '^\\S{6,20}$',
              message: '密码为6-20位',
              trigger: 'blur change'
            },
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('确认新密码不能为空'));
                } else if (value.length < 6 || value.length > 20) {
                  callback(new Error('密码为6-20位'));
                } else if (value !== this.formItem.newPassword) {
                    callback(new Error('与新密码必须一致'));
                } else {
                    callback();
                }
              },
              trigger: 'blur change'
            }
          ]
        }
      };
    },
    methods: {
      // 确认新密码

      // 新增和修改按钮
      upsave (name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            // 修改密码
            let payload = {
                oldPassword: this.formItem.oldPassword,
                newPassword: this.formItem.newPassword
            };
            try {
                await updatePassword(qs.stringify(payload));
                this.$Notice.success({
                  title: '修改密码成功'
                });
                this.$refs['formItem'].resetFields();
            } catch (error) {}
          } else {
            this.$Notice.warning({
              title: '信息未填写完整'
            });
          }
        });
      }
    },
    created () {
    }
  };
</script>
