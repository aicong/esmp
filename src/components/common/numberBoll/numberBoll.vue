<template>
  <div class="number-ball" :style="styles">
    {{ text }}
  </div>
</template>

<script>
export default {
    name: 'numberBoll',
    props: {
      size: {
        required: true,
        type: Number
      },
      text: {
        required: true,
        type: String
      },
      bgColor: {
        type: String
      },
      textColor: {
        default: '#fff',
        type: String
      },
      fontSize: {
        type: Number,
        default: 16
      }
    },
    computed: {
      styles () {
        const style = {};
        style.width = this.size + 'px';
        style.height = this.size + 'px';
        style.lineHeight = this.size + 'px';
        style.borderRadius = this.size + 'px';
        style['-webkit-border-radius'] = this.size + 'px';
        style['-moz-border-radius'] = this.size + 'px';
        if (this.bgColor) {
          style.background = this.bgColor;
        }
        if (this.textColor) {
          style.color = this.textColor;
        }
        if (this.fontSize) {
          style.fontSize = this.fontSize + 'px';
        }
        return style;
      }
    }
};
</script>

<style scoped>
  .number-ball {
    display: inline-block;
    text-align: center;
    font-weight: bold;
    vertical-align: center;
  }
</style>
