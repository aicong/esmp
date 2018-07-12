/**
 * 描述：app.vue
 */
<style lang="scss">
    @import 'styles/theme/index.css';
    @import 'src/styles/common';
    @import 'src/styles/animate';
</style>
<template>
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
</template>
