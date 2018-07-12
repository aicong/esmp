<template>
   <div class="tem-div">
    <div class="c-header">
      <Button type="ghost" v-go-back>返回</Button>
    </div>
    <div class="c-content">
      <h3>基本信息</h3>
      <Form ref="tenantForm" :model="tenantForm" :rules="ruleValidate" :label-width="100">
        <Row>
          <Col span="9" offset="1">
          <FormItem label="租户名称" prop="name">
            <i-input  v-model="tenantForm.name" placeholder="租户名称"></i-input>
          </FormItem>
          </Col>
          <Col span="9" offset="2">
          <FormItem label="联系人电话" prop="phone">
            <i-input v-model="tenantForm.phone" placeholder="联系人电话"></i-input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9" offset="1">
          <FormItem label="租户地址" prop="address">
            <i-input v-model="tenantForm.address" placeholder="租户地址"></i-input>
          </FormItem>
          </Col>
          <Col span="9" offset="2">
          <FormItem label="联系人姓名" prop="contact">
            <i-input v-model="tenantForm.contact" placeholder="联系人姓名"></i-input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9" offset="1">
          <FormItem label="所属省份" prop="provinceId">
            <i-select v-model="tenantForm.provinceId" placeholder="所属省份" transfer filterable clearable @on-change="changeArea(tenantForm.provinceId)">
              <i-option v-for="item in districtData" :key="item.id" :value="item.id" :label="item.name"></i-option>
            </i-select>
          </FormItem>
          </Col>
          <Col span="9" offset="2">
          <FormItem label="所属城市" prop="cityId">
            <i-select v-model="tenantForm.cityId" placeholder="所属城市" transfer filterable clearable>
              <i-option v-for="item in cityArray" :key="item.id" :value="item.id" :label="item.name"></i-option>
            </i-select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9" offset="1">
            <FormItem label="G7机构码">
              <i-input v-model="tenantForm.orgCode" placeholder="G7机构码"></i-input>
            </FormItem>
          </Col>
           <Col span="9" offset="2">
            <FormItem label="备注信息">
              <i-input v-model="tenantForm.description" placeholder="备注信息 "></i-input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem>
            <Button type="ghost" v-go-back>取消</Button>
            <Button type="primary" @click="save('tenantForm')">保存</Button>
          </FormItem>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getById, createFun, updateFun } from '@/service/userManage/tenantService';

export default {
  data () {
    return {
      tenantForm: {},
      cityArray: [],
      ruleValidate: {
          name: [
            {required: true, message: '租户名称不能为空', trigger: 'blur'},
            {pattern: '^[\u4e00-\u9fa5]{2,20}$', message: '租户名称为2至20个中文', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '手机号不能为空', trigger: 'blur'},
            {pattern: '^1[3,4,5,6,7,8]\\d{9}$', message: '手机号格式不对', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '租户地址不能为空', trigger: 'blur'},
            {pattern: '^.{0,64}$', message: '租户地址不能超过64个字符', trigger: 'blur'}
          ],
          contact: [
            {required: true, message: '联系人姓名不能为空', trigger: 'blur'},
            {pattern: '^.{0,16}$', message: '联系人姓名为2至20个字符', trigger: 'blur'}
          ],
          provinceId: [
            {required: true, type: 'number', message: '所属省份不能为空', trigger: 'blur change'}
          ],
          cityId: [
            {required: true, type: 'number', message: '所属城市不能为空', trigger: 'blur change'}
          ],
          orgCode: [
            {pattern: '^.{0,30}$', message: 'G7机构码不能超过30个字符', trigger: 'blur'}
          ]
        }
    };
  },
  components: {

  },
  computed: {
    ...mapState([
        'districtData'
      ])
  },
  async created () {
     const res = this.$route.query;
      if (res.id) {
        this.isUpdate = true;
        await this.init(res.id);
      }
  },
  watch: {

  },
  methods: {
    async init (id) {
        this.title = '编辑';
        const result = await getById({id: id});
        const data = result.data || [];
        this.tenantForm = data;
        this.cityArray = this._hyTool.getCitiesByPId(this.tenantForm.provinceId);
      },
      save (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const res = this.$route.query;
          const payload = Object.assign({}, this.tenantForm);
          if (!res.id) {
            await createFun(payload);
          } else {
            await updateFun({id: res.id}, payload);
          }
          this.$Notice.success({
            title: this.title + '成功'
          });
          this.$router.push('/baseManage/base');
        } else {
          this.$Notice.warning({
            title: '信息未填写完整'
          });
        }
      });
    },
    changeArea (data) {
      if (!data) {
          this.cityArray = [];
          this.tenantForm.cityId = null;
          return;
        } else {
          this.tenantForm.cityId = null;
          this.cityArray = this._hyTool.getCitiesByPId(data);
        }
      }
  },
  mounted () {

  }
};
</script>

<style lang="less" scoped>
  .tem-div {
    padding: 10px;
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

</style>
