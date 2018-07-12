<style lang="less">
  @import "./home.less";
  /*@import "../../styles/common.less";*/
</style>
<template>
  <div class="home-main">
    <Row :gutter="50">
      <i-col :span="6" :style="{marginBottom: '10px',marginTop: '30px'}">
        <Card :padding="cardPad" class="top_card" style="background: #fb8456">
          <p class="hy_title">当日调度任务</p>
          <p class="card_font">{{todayCount}}</p>
        </Card>
      </i-col>
      <i-col :span="6" :style="{marginBottom: '10px',marginTop: '30px'}">
        <Card :padding="cardPad" class="top_card" style="background: #f8ba38;">
          <p class="hy_title">本月调度任务</p>
          <p class="card_font">{{monthCount}}</p>
        </Card>
      </i-col >
      <i-col :span="6" :style="{marginBottom: '10px',marginTop: '30px'}">
        <Card :padding="cardPad" class="top_card" style="background: #46c056;">
          <p class="hy_title">在途车辆</p>
          <p class="card_font">{{onLine}}</p>
        </Card>
      </i-col>
      <i-col :span="6" :style="{marginBottom: '10px',marginTop: '30px'}">
        <Card :padding="cardPad" class="top_card" style=" background: #5a8ed4;">
          <p class="hy_title">离线车辆</p>
          <p class="card_font">{{offLine}}</p>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="40" class="hy_route">
      <i-col v-for="item in toDoList" :span="3" class="hy_col" :key="item.title">
        <Card :key="item.title" :style="{background: item.bgColor}">
          <div style="margin-left: 5px;cursor:pointer;height: 100px;line-height: 135px;" @click="goPage(item.route)">
            <Icon :type="item.icon" size="60" color="white"></Icon>
          </div>
        </Card>
        <p>{{item.title}}</p>
      </i-col>
    </Row>
    <Row>
      <div id="home_map" class="home_map"></div>
    </Row>
  </div>
</template>

<script>
 import BMap from 'BMap';
 import BMapLib from 'BMapLib';
 import { count } from '@/service/dispatchCenter/waybillService';
 import service from '../onTheWayCenter/fullChartMonitoring/service';

  export default {
    name: 'home',
    components: {
    },
    data () {
      return {
        cardPad: 0,
        todayCount: 0,
        monthCount: 0,
        onLine: 0,
        offLine: 0,
        map: null,
        toDoList: [
          {
            title: '手工调度',
            icon: 'speakerphone',
            bgColor: '#98d637',
            route: '/dispatchCenter/dispatch'
          },
          {
            title: '调度单管理',
            icon: 'document-text',
            bgColor: '#fdbe25',
            route: '/dispatchCenter/waybill'
          },
          {
            title: '订单管理',
            icon: 'clipboard',
            bgColor: '#5989d6',
            route: '/dispatchCenter/order'
          },
          {
            title: '车辆全图监控',
            icon: 'map',
            bgColor: '#33cb01',
            route: '/wayCenter/fullChartMonitoring'
          },
          {
            title: '调度监控看板',
            icon: 'monitor',
            bgColor: '#fc844e',
            route: '/monitorBoard'
          },
          {
            title: '线路管理',
            icon: 'location',
            bgColor: '#97d537',
            route: '/baseManage/route'
          },
          {
            title: '运力实时看板',
            icon: 'videocamera',
            bgColor: '#fdbe25',
            route: '/capacityCenter/capacityNow'
          }
        ]
      };
    },
    mounted () {
      this._initMap();
      this.getDispatchCount(new Date().setHours(0, 0, 0, 0), true);
      let date = new Date().setDate(1);
      this.getDispatchCount(new Date(date).setHours(0, 0, 0, 0));
      this.getVehicle();
    },
    methods: {
      // 初始化地图
      _initMap () {
        // 百度地图API功能
        this.map = new BMap.Map('home_map');
        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
        this.map.enableScrollWheelZoom();
      },
      goPage (route) {
        this.$router.push(route);
      },
      // 获取调度单数量
      getDispatchCount (begin, isToday = false) {
        let params = {
          createTimeAfter: begin   // 创建时间大于
        };
        count(params).then(res => {
          if (isToday) this.todayCount = res.data;
          else this.monthCount = res.data;
        }).catch(ret => {
          this.$message.error('获取调度任务数量失败');
        });
      },
      // 获取在线离线车辆
      getVehicle () {
        let _that = this;
        let pt = null;
        let markers = [];
        let myIcon = new BMap.Icon('/static/images/car.png', new BMap.Size(20, 42));
        service.getCurrentGps({pageNo: 1, pageSize: 100000}).then(res => {
          _that.list = res.data;
          for (let item of _that.list) {
            pt = new BMap.Point(item.lng, item.lat);
            let marker = new BMap.Marker(pt, {icon: myIcon});
            marker.enableMassClear();
            marker.setRotation(item.course);
            markers.push(marker);
            if (item.status === 4) {
              _that.onLine += 1;
            } else if (item.status === 1) {
              _that.offLine += 1;
            }
          }
          this.addClus(markers);
        }).catch(ret => {
          this.$message.error('获取在线离线车辆失败');
          _that.list = [];
        });
      },
      // 添加聚合点
      addClus (markers) {
        return new BMapLib.MarkerClusterer(this.map, {markers: markers});
      }
    }
  };
</script>
