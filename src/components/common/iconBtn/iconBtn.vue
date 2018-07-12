<style lang="scss" scoped>
  .newIconBtn {
    width:20px;
    height:20px;
    border:0;
    padding: 0 4px;
    margin:0 5px;
    cursor: pointer;
    border-radius: 2px;
  }
</style>
<template>
  <Button type="text" @click="clickBtn($event)" class="newIconBtn">
    <Tooltip  placement="bottom" :content="text" :delay="500" transfer>
      <Icon :type="iconType" :size="iconSize" style="color: #fff;"></Icon>
    </Tooltip>
  </Button>
</template>
<script>
  export default {
    name: 'hyIconBtn',
    data () {
      return {
      };
    },
    props: {
      text: String,
      iconType: String,
      iconSize: String,
      authCode: String
    },
    created () {},
    methods: {
      clickBtn ($event) {
        this.$emit('click', $event);
      }
    }
  };
</script>
