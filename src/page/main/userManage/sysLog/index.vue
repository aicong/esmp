<template>
  <div class="tem-div">
    <!--搜索-->
    <Card class="tem-card">
      <div class="search-item" :style="searchItemStyle">
        <Form ref="searchForm" class="frm-search" label-position="right" inline :label-width="80">
          <FormItem label="操作日期">
            <DatePicker type="daterange" clearable :options="dateoption" transfer placement="bottom-start" v-model="searchDate" format="yyyy年MM月dd日" placeholder="请选择起始结束日期" class="datepicker"></DatePicker>
          </FormItem>
          <FormItem label="菜单模块">
            <Select clearable v-model="searchData.module">
              <Option v-for="item in moduleType" :value="item.value" :key="item.value" :label="item.label"></Option>
            </Select>
          </FormItem>
          <FormItem label="操作代码">
            <Select clearable v-model="searchData.controlCode">
              <Option v-for="item in controlCode" :value="item.value" :key="item.value" :label="item.label"></Option>
            </Select>
          </FormItem>
          <FormItem label="操作结果">
            <Select clearable v-model="searchData.controlResult">
              <Option v-for="item in resultList" :value="item.value" :key="item.value" :label="item.label"></Option>
            </Select>
          </FormItem>
          <FormItem label="操作描述">
            <i-input placeholder="操作描述" v-model="searchData.controlDiscribeLk" clearable></i-input>
          </FormItem>
          <FormItem label="来源">
            <Select clearable v-model="searchData.source">
              <Option v-for="item in sourceList" :value="item.value" :key="item.value" :label="item.label"></Option>
            </Select>
          </FormItem>
          <FormItem label="操作用户">
            <Select v-model="searchData.createUserLk" filterable clearable placeholder="请输入用户名关键字查询">
              <Option v-for="(item, index) in userList" :value="item.value" :key="index" :label="item.label"></Option>
            </Select>
          </FormItem>
          <FormItem label="操作IP">
            <i-input placeholder="操作IP" v-model="searchData.createIpLk" clearable></i-input>
          </FormItem>
        </Form>
      </div>
      <div class="search-btn">
          <span class="search-more" @click="changeSearchDiv" v-show="searchShow">
            <Icon :type="searchDiv === true?'chevron-up':'chevron-down'" :size="10"></Icon> {{searchFont}}
          </span>
        <Button type="primary" @click="search()" icon="search" :loading="loading">搜索</Button>
      </div>
    </Card>
    <!--按钮-->
    <Card class="tem-card">
      <div style="text-align: left">
        <i-button @click="exportFun">导出</i-button>
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
  import { sysLogList, getDict, sysLogCount } from '@/service/userManage/sysLogService';
  import { userList } from '@/service/userManage/roleMService';
  import XLSX from 'xlsx';

  export default {
    mixins: [list],
    data () {
      return {
        cityArray: [],
        loading: false,
        searchDate: [
          new Date(+new Date() - 86400000 * 2),
          new Date()
        ],
        dateoption: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now();
          }
        },
        controlCode: [],
        moduleType: [],
        userList: [],
        resultList: [
          {
            label: '失败',
            value: 0
          },
          {
            label: '成功',
            value: 1
          }
        ],
        sourceList: [
          {
            label: '电脑端',
            value: 'PC'
          },
          {
            label: '手机APP',
            value: 'APP'
          },
          {
            label: '微信端',
            value: 'WX'
          }
        ],
        columnsTitle: [
          {
            key: 'index',
            width: 60,
            align: 'center',
            render: (h, params) => {
              return h('div', params.index + (this.searchData.pageNo - 1) * this.searchData.pageSize + 1);
            }
          },
          {
            key: 'module',
            title: '菜单模块',
            minWidth: 100,
            align: 'center',
            render: (h, params) => {
              for (let item of this.moduleType) {
                if (item.value === params.row.module) {
                  return h('p', item.label);
                }
              }
            }
          },
          {
            key: 'controlCode',
            title: '操作代码',
            minWidth: 100,
            align: 'center',
            render: (h, params) => {
              for (let item of this.controlCode) {
                if (item.value === params.row.controlCode) {
                  return h('p', item.label);
                }
              }
            }
          },
          {
            key: 'controlResult',
            title: '操作结果',
            align: 'center',
            minWidth: 100,
            render: (h, params) => {
              return this._filters.controlResult(h, params, 'controlResult');
            }
          },
          {
            title: '操作描述',
            key: 'controlDiscribe',
            minWidth: 170,
            align: 'center'
          },
          {
            key: 'source',
            title: '来源',
            minWidth: 100,
            align: 'center',
            render: (h, params) => {
              return this._filters.source(h, params, 'source');
            }
          },
          {
            key: 'createUser',
            title: '操作用户',
            minWidth: 120,
            align: 'center'
          },
          {
            key: 'createTime',
            title: '操作时间',
            minWidth: 170,
            align: 'center'
          },
          {
            key: 'updateIp',
            title: '操作IP',
            minWidth: 130,
            align: 'center'
          }
        ]
      };
    },
    mounted () {
      this.getDicts({type: 'sys_log', key: 'control_code'}, 'code');
      this.getDicts({type: 'sys_log', key: 'module'}, 'module');
      this._getAllUser();
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
            if (!this.cacheSearchData[key] && this.cacheSearchData[key] !== 0) {
              delete this.cacheSearchData[key];
            }
          }
          if (this.searchDate[0]) {
            let begin = new Date(new Date(this.searchDate[0]).setHours(0, 0, 0, 0));
            this.cacheSearchData.createTimeAfter = this._hyTool.DateFormat(begin, 'yyyy-MM-dd hh:mm:ss');
            this.cacheSearchData.createTimeBefore = this._hyTool.DateFormatLast(this.searchDate[1], 'yyyy-MM-dd');
          } else {
            delete this.cacheSearchData.createTimeAfter;
            delete this.cacheSearchData.createTimeBefore;
          }
          const result = await sysLogList(this.cacheSearchData);
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
      async _getCount (searchData) {
        const result = await sysLogCount(searchData);
        this.totalElement = result.data || 0;
      },
      // 字典表
      async getDicts (params, type) {
        let data = await getDict(params);
        let list = data.data.map(item => {
          return {label: item.label, value: item.value};
        });
        if (type === 'code') {
          this.controlCode = list;
        } else if (type === 'module') {
          this.moduleType = list;
        }
      },
      // 用户名列表
      _getAllUser () {
        userList().then(res => {
          this.userList = res.data.map(item => {
            return {label: item.realName, value: item.realName};
          });
        }).catch();
      },
      // 导出
      async exportFun () {
        let opt = Object.assign({}, this.cacheSearchData);
        opt.pageNo = 1;
        opt.pageSize = this.totalElement;
        opt.contractorType = 0; // 自营
        const result = await sysLogList(opt);
        const data = [];
        data[0] = [
          '菜单模块',
          '操作代码',
          '操作结果',
          '操作描述',
          '来源',
          '操作用户',
          '操作时间',
          '操作IP'
        ];
        for (let i = 0; i < result.data.length; i++) {
          // 每一行的数据
          let item = result.data[i];
          data[i + 1] = [];
          for (let it of this.moduleType) {
            if (it.value === item.module) {
              data[i + 1].push(it.label);  // 菜单模块
              break;
            }
          }
          for (let tt of this.controlCode) {
            if (tt.value === item.controlCode) {
              data[i + 1].push(tt.label);  // 操作代码
              break;
            }
          }
          data[i + 1].push((item.controlResult === 0 ? '失败' : '成功'));  // 操作结果
          data[i + 1].push(item.controlDiscribe);  // 操作描述
          data[i + 1].push((item.source === 'PC' ? '电脑端' : (item.source === 'APP' ? '手机APP' : '微信端')));  // 来源
          data[i + 1].push(item.createUser);  // 操作用户
          data[i + 1].push(item.createTime);  // 操作时间
          data[i + 1].push(item.updateIp);  // 操作IP
        }
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, '日志管理');
        const wbout = XLSX.write(wb, {type: 'array', bookType: 'xlsx'});
        this.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '日志管理.xlsx');
      },
      saveAs (obj, fileName) {
        let tmpa = document.createElement('a');
        tmpa.download = fileName || '下载';
        tmpa.href = URL.createObjectURL(obj);
        tmpa.click();
        setTimeout(function () {
          URL.revokeObjectURL(obj);
        }, 100);
      }
    }
  };
</script>
