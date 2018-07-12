/**
 *  描述：混合类
 */
import { mapActions } from 'vuex';
import $ from 'jquery';
export default {
  data () {
    return {
      list: [],                                           // 列表展示
      loadingText: this.$store.state.app.loadingText,         // loading 文字
      searchData: {                                       // 搜索条件
        pageNo: this.$store.state.app.page,             // 当前页码
        pageSize: this.$store.state.app.limit            // 分页大小
      },
      pageSizeOpts: [10, 20, 50, 100],
      multipleSelection: [],                              // 多选
      totalElement: this.$store.state.app.totalElement,        // 总数量
      searchDiv: false,
      searchFont: '更多',
      searchItemStyle: { height: '50px' },
      searchShow: false,
      searchShowHeight: 0,
      timer: null,
      isSearchClick: false,                             // 是否点击搜索按钮(避免点击分页部分也改变了搜索条件)
      cacheSearchData: {},                                // 缓存的上一步搜索条件
      screenWidth: document.body.clientWidth
    };
  },
  computed: {
    // 删除样式
    delClasses () {
      return {
        'hy-default-btn': !this.multipleSelection.length
      };
    },
    // 分页是否展示
    pageShow () {
      return !!this.list.length;
    },
    searchListLoading () {
        return this.$store.state.app.searchListLoading;
    },
    actionLoading () {
      return this.$store.state.app.actionLoading;
    }
  },
  async created () {
    if (this.$store.state.districtData.length === 0) {
      await this.getDistrictData();
    }
    this.currentChange(1);
  },
  mounted () {
    this.$nextTick(() => {
      this.searchShowHeight = this.$refs['searchForm'] ? this.$refs['searchForm'].$el.clientHeight : 50;
      if (this.searchShowHeight * 1 < 80) {
        this.searchShow = false;
      } else {
        this.searchShow = true;
      }
    });
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
    this.showHideSearch();
  },
  methods: {
    ...mapActions([
      'getDistrictData',
      'roleMenu'
    ]),
    showHideSearch () {
      this.searchShowHeight = $('.search-item .frm-search').height();
      if (this.searchShowHeight * 1 < 80) {
        this.searchShow = false;
      } else {
        this.searchShow = true;
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    clearSelecttion () {
      this.multipleSelection = [];
    },
    currentChange (val) {
      this._hyTool.csl(true);
      this.searchData.pageNo = val;
      // 获取列表
      this._getList();
    },
    pageSizeChange (pageSize) {
      this.searchData.pageSize = pageSize;
      this.currentChange(1);
    },
    search () {
      this.isSearchClick = true;
      this.currentChange(1);
    },
    changeSearchDiv () {
      this.searchDiv = !this.searchDiv;
      let searchHeight = this.$refs['searchForm'].$el.clientHeight;// 获取隐藏搜索项高度
      if (this.searchDiv) {
        this.searchFont = '收起';
        this.searchItemStyle = { height: searchHeight + 'px' };
      } else {
        this.searchFont = '更多';
        this.searchItemStyle = { height: '50px' };
      }
    },
    debounce (time, action) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        action && action();
      }, time);
    }
  },
  watch: {
    screenWidth: function () {
      this.showHideSearch();
    }
  /*  searchShow () {
      this.searchShowHeight = $('.search-item .frm-search').height();
      console.log('搜索框高度：' + this.searchShowHeight);
      if (this.searchShowHeight * 1 < 80) {
        this.searchShow = false;
      } else {
        this.searchShow = true;
      }
    } */
  }
};
