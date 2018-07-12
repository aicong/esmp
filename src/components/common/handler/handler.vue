/**
 * 描述：table操作
 */
<style lang="scss" scoped>
    .iconfont {
        vertical-align: center;
    }
    .pSpan {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin: 0 1px;
        cursor: pointer;
    }
</style>
<template>
    <el-tooltip class="item" :content="tips" :placement="placement">
      <span class="pSpan" @click="handlerClick" :style="{background: bgColor}">
        <i :class="classes" :style="styles"></i>
      </span>
    </el-tooltip>
</template>
<script>
    const prefixCls = 'iconfont';

    function oneOf (str, array) {
        let status = false;
        array.forEach(item => {
            if (item === str) {
                status = true;
            }
        });
        return status;
    }

    export default {
        name: 'optHandler',
        props: {
            type: String,
            top: String,
            size: [Number, String],
            color: String,
            bgColor: String,
            placement: {
                validator (value) {
                    return oneOf(value, ['top', 'left', 'right', 'bottom']);
                },
                default: 'top'
            },
            hover: String,
            tips: String
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`icon-${this.type}`]: !!this.type
                    }
                ];
            },
            styles () {
                let style = {};
                if (this.size) {
                    style['font-size'] = `${this.size}px`;
                }
                if (this.top) {
                  style['top'] = `${this.top}%`;
                }
                if (this.color) {
                    style.color = this.color;
                }
                return style;
            }
        },
        methods: {
            handlerClick (event) {
                this.$emit('click', event);
            }
        }
    };
</script>
