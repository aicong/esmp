<style lang="scss" scoped>
  .danWei {
    width:20px;
    height:20px;
    border:0;
    padding: 0 4px;
    margin:0 5px;
  }
</style>
<template>
    <Tooltip  placement="top" :content="text" :delay="500" transfer>
      <i-input :placeholder="placeholder" v-model="data"></i-input>
      <span class="danWei" :label="fonts"></span>
    </Tooltip>
</template>
<script>
  export default {
    name: 'hyInputAndBtn',
    data () {
      return {
      };
    },
    props: {
      data: String,
      fonts: String,
      placeholder: String,
      text: String
    },
    created () {},
    methods: {
      clickBtn () {
        this.$emit('click');
      }
    }
  };
</script>
