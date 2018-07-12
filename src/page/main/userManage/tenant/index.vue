<template>
  <div class="tem-div">
    <!--搜索-->
    <Card class="tem-card">
      <div class="search-item" :style="searchItemStyle">
        <Form ref="searchForm" class="frm-search" label-position="right" inline :label-width="80">
          <FormItem label="租户名称">
            <i-input placeholder="租户名称" v-model="searchData.nameLk" clearable></i-input>
          </FormItem>
          <FormItem label="所属省份">
            <Select placeholder="请选择省份" v-model="searchData.provinceId" filterable clearable @on-change="changeArea(searchData.provinceIdIn)">
                  <Option v-for="item in districtData" :key="item.id" :value="item.id" :label="item.name">{{ item.name }}</Option>
              </Select>
          </FormItem>
          <FormItem label="所属城市">
            <Select placeholder="所属城市" v-model="searchData.cityId" filterable clearable>
              <Option v-for="item in cityArray" :key="item.id" :value="item.id" :label="item.name">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="租户地址">
            <i-input placeholder="租户地址" v-model="searchData.addressLk" clearable></i-input>
          </FormItem>
          <FormItem label="联系人电话">
            <i-input placeholder="联系人电话" v-model="searchData.phone" clearable></i-input>
          </FormItem>
           <FormItem label="联系人姓名">
            <i-input placeholder="联系人姓名" v-model="searchData.contact" clearable></i-input>
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
          <Button type="primary" @click="search()" icon="search" :loading="loading">搜索</Button>
        </div>
    </Card>
    <!--按钮-->
    <Card class="tem-card">
      <div style="text-align: left">
        <Button class="search-btn-plus" type="ghost" icon="plus" @click="addOrUpdate()">新增</Button>
      </div>
    </Card>
    <!--表格-->
    <Card class="tem-card">
      <!--table部分-->
      <Table :columns="columnsTitle" :loading="loading" :data="list" @on-selection-change="handleSelectionChange"></Table>
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
  import { mapState } from 'vuex';
  import list from '@/js/mixins/list';
  import { queryList, count, deleteFun, banbase, unbanbase } from '@/service/userManage/tenantService';
  export default {
    mixins: [list],
    data () {
      return {
        provinceArray: [],
        cityArray: [],
        loading: false,
        // 查询条件
        searchObj: {},
        modalObj: {
          title: '',
          addOrModify: false
        },
        columnsTitle: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            key: 'name',
            title: '租户名称',
             width: 120,
            align: 'center',
            sortable: true
          },
          {
            key: 'address',
            title: '租户地址',
            width: 220,
            align: 'center'
          },
          {
            key: 'orgCode',
            title: 'G7机构码',
            width: 120,
            align: 'center'
          },
          {
            key: 'province',
            title: '所属省份',
             width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [ this.toProvince(params) ]);
            }

          },
          {
            key: 'city',
            title: '所属城市',
             width: 120,
            align: 'center',
            render: (h, params) => {
              return h('div', [ this.toCity(params) ]);
            }
          },
          {
            key: 'phone',
            title: '联系人手机号',
            width: 170,
            align: 'center'

          },
          {
            key: 'contact',
            title: '联系人姓名',
            width: 120,
            align: 'center'

          },
          {
            key: 'createUser',
            title: '创建人',
            width: 120,
            align: 'center'

          },
          {
            key: 'createTime',
            title: '创建时间',
            width: 170,
            align: 'center',
            sortable: true
          },
          {
            title: '状态',
            key: 'bannedtan',
            width: 140,
            sortable: true
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIconBtn(h, params, this.addOrUpdate, '编辑', 'ios-compose-outline', '', {background: '#319ce2'}, 'userEdit'),
                this._hyTool.createIconBtn(h, params, this.changeStatus, '启用状态', params.row.banned === '禁用' ? 'unlocked' : 'locked', '', {background: '#ED3F14'})
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
      this._getCount();
    },
    computed: {
      ...mapState([
        'districtData'
      ])
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
          result.data.forEach(function (item, i) {
              if (item.banned === false) {
                item.bannedtan = '启用';
              } else {
                item.bannedtan = '禁用';
              }
          });
          this.list = result.data || [];
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
      addOrUpdate (row) {
        const id = row ? row.id : null;
        this.$router.push({name: 'tenantAdd', query: {id: id}});
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
      },
      changeArea (data) {
        if (!data) {
          this.cityArray = [];
          this.searchData.cityIdIn = null;
          return;
        }
        this.cityArray = this._hyTool.getCitiesByPId(data);
      },
       // 启用状态
      changeStatus (params, index) {
        this.$Modal.confirm({
          title: '启用状态',
          content: params.banned === '启用' ? '是否禁用此租户' : '是否启用此租户',
          onOk: async () => {
            if (params.banned === '启用') {
                await banbase({'id': params.id});
                this.$Notice.success({
                  title: '禁用租户成功'
                });
                  this._getList();
            } else {
                await unbanbase({'id': params.id});
                this.$Notice.success({
                  title: '启用租户成功'
                });
                  this._getList();
            }
          },
          onCancel: () => {
            this.$Message.info('已取消操作');
          }
        });
      },
      toProvince (params) {
        let province = this._hyTool.getProvinceById(params.row.provinceId);
        return province.name;
      },
      toCity (params) {
        let city = this._hyTool.getCityById(params.row.cityId);
        return city.name;
      }
    }
  };
</script>

<style scoped>
</style>
