/**
 *  描述：混合类
 */
// import $ from 'jquery';
export default {
  data () {
    return {
    };
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.getScreen();
  },
  methods: {
    // 显示大屏
    getScreen () {
      let left = document.getElementsByClassName('sidebar-menu-con')[0];
      let header = document.getElementsByClassName('main-header-con')[0];
      let main = document.getElementsByClassName('single-page-con')[0];
      let mainHeader = document.getElementsByClassName('main-header')[0];
      left.style.display = 'none';
      header.style.padding = 0;
      mainHeader.style.display = 'none';
      main.style.width = '100%';
      main.style.height = '100%';
      main.style.left = 0;
      main.style.top = 0;
      main.style.padding = 0;
      main.style.zIndex = 100;
    }
  },
  watch: {
  },
  destroyed () {
    let left = document.getElementsByClassName('sidebar-menu-con')[0];
    let header = document.getElementsByClassName('main-header-con')[0];
    let main = document.getElementsByClassName('single-page-con')[0];
    let mainHeader = document.getElementsByClassName('main-header')[0];
    left.style.display = 'block';
    left.style.left = '0';
    left.style.top = '0';
    header.style.paddingLeft = '200px';
    mainHeader.style.display = 'block';
    main.style.width = 'auto';
    main.style.height = 'auto';
    main.style.position = 'absolute';
    main.style.left = '200px';
    main.style.top = '60px';
    main.style.padding = '4px';
    main.style.zIndex = 1;
  }
};
