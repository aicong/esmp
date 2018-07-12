<style lang="less">
    @import '../styles/unlock.less';
</style>

<template>
    <transition name="show-unlock">
        <div class="unlock-body-con" v-if="showUnlock" @keydown.enter="handleUnlock">
            <div @click="handleClickAvator" class="unlock-avator-con" :style="{marginLeft: avatorLeft}">
                <img class="unlock-avator-img" :src="currentUser.headPicture || 'static/images/user.png'">
                <div  class="unlock-avator-cover">
                    <span><Icon type="unlocked" :size="30"></Icon></span>
                    <p>解锁</p>
                </div>
            </div>
            <div class="unlock-avator-under-back" :style="{marginLeft: avatorLeft}"></div>
            <div class="unlock-input-con">
                <div class="unlock-input-overflow-con">
                    <div class="unlock-overflow-body" :style="{right: inputLeft}">
                        <input ref="inputEle" v-model="password" class="unlock-input" type="password" placeholder="请输入登录密码" />
                        <button ref="unlockBtn" @mousedown="unlockMousedown" @mouseup="unlockMouseup" @click="handleUnlock" class="unlock-btn"><Icon color="white" type="key"></Icon></button>
                    </div>
                </div>
            </div>
            <div class="unlock-locking-tip-con">已锁定</div>
        </div>
    </transition>
</template>

<script>
import { login } from '@/service/login/loginService';
import qs from 'qs';
export default {
    name: 'Unlock',
    data () {
        return {
          avatorLeft: '0px',
          inputLeft: '400px',
          password: '',
          check: null,
          currentUser: {}
        };
    },
    props: {
        showUnlock: {
          type: Boolean,
          default: false
        }
    },
    mounted () {
      this.currentUser = JSON.parse(this._hyTool.getStore('currentUser', true));
    },
    methods: {
        async validator () {
          const data = {
            account: this.currentUser.username || this.currentUser.phone,
            password: this.password // 加密后传给后台
          };
          let response = await login(qs.stringify(data));
          if (response.result) {
            return true;
          } else {
            return false;
          }
        },
        handleClickAvator () {
            this.avatorLeft = '-180px';
            this.inputLeft = '0px';
            this.$refs.inputEle.focus();
        },
      async handleUnlock () {
            if (await this.validator()) {
                this.avatorLeft = '0px';
                this.inputLeft = '400px';
                this.password = '';
                this._hyTool.removeStore('isLocked');
                this.$emit('on-unlock');
            } else {
                this.$Message.error('密码错误,请重新输入');
            }
        },
        unlockMousedown () {
            this.$refs.unlockBtn.className = 'unlock-btn click-unlock-btn';
        },
        unlockMouseup () {
            this.$refs.unlockBtn.className = 'unlock-btn';
        }
    }
};
</script>
