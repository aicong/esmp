/**
 *  描述：字典混合类  废弃
 */
import { mapState, mapActions } from 'vuex';
export default {
  data () {
    return {
    };
  },
  computed: {
    ...mapState([
      'selectArrayList',
      'formSelectArrayList'
    ])
  },
  created () {
    if (!this.selectArrayList.brandList.length) this.getSelectLists('brand');
    // if (!this.selectArrayList.colorList.length) this.getSelectLists('color');
    if (!this.selectArrayList.producerList.length) this.getSelectLists('producer');
    if (!this.selectArrayList.orgList.length) this.getSelectLists('org');
    if (!this.selectArrayList.tboxSupplierList.length) this.getSelectLists('tboxSupplier');
  },
  methods: {
    ...mapActions([
      'getSelectLists',
      'getFormSelectLists'
    ])
  }
};
