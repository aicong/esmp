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
        border-radius: 0;
        width: 85px;
        height: 32px;
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
      <h3>基本信息</h3>
      <Form ref="formItem" :model="formItem" :rules="ruleData" :label-width="110">
        <Row>
          <i-col span="9" offset="1">
          <FormItem label="部门名称" prop="name">
            <i-input v-model="formItem.name" placeholder="请输入部门名称"></i-input>
          </FormItem>
          </i-col>
          <i-col span="9" offset="2">
          </i-col>
        </Row>
        <Row>
          <FormItem>
            <Button type="ghost" @click="back">取消</Button>
            <Button type="primary" @click="upsave('formItem')">保存</Button>
          </FormItem>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import qs from 'qs';
  import {createFun, updateFun, getById} from '@/service/baseManage/departmentService';
  export default {
    components: {},
    data () {
      return {
        title: '新增',
        formItem: {
            'name': null
        },
        ruleData: {
          name: [
            {
              required: true,
              message: '部门名称不能为空',
              trigger: 'blur'
            },
            {
              pattern: '^\\S{2,20}$',
              message: '名称为2-20位',
              trigger: 'blur change'
            }
          ]
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
            const payload = {
                name: this.formItem.name
            };
            // payload.productionDate = this._hyTool.DateFormat(payload.productionDate, 'yyyy-MM-dd hh:mm:ss');
            console.log('payload');
            console.log(payload);
            const res = this.$route.query;
            if (res.id) {
              console.log('修改');
              await updateFun({
                id: res.id
              }, qs.stringify(payload));
            } else {
              console.log('新增');
              await createFun(qs.stringify(payload));
            }
            this.$Notice.success({
              title: this.title + '成功'
            });
            this.$router.push('/userManage/department');
          } else {
            this.$Notice.warning({
              title: '信息未填写完整'
            });
          }
        });
      },
      // 编辑页面获取单个部门信息
      async getDepartment () {
        const res = this.$route.query;
        if (res.id) {
          this.title = '编辑';
          const result = await getById({id: res.id});
          console.log(result);
          this.formItem = result.data;
          this.disabled = true;
        }
      }
    },
    created () {
      this.disabled = false;
      this.getDepartment();
    }
  };
</script>
