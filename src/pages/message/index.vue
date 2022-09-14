<template>
<view class="message-container">
  <view>
    <uni-list>
      <uni-list :border="true">
        <!-- 右侧带角标 -->
        <!-- <uni-list-chat title="uni-app" avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" note="您收到一条新的消息" time="2020-02-02 20:20" badge-text="12"></uni-list-chat>-->
        <!-- 头像显示角标 -->
        <uni-list-chat
            title="Apple官方旗舰店"
            avatar="https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/logo/logo.png"
            note="您收到一条新的消息"
            time="刚刚"
            badge-positon="left"
            badge-text="99">
          <!-- 此处可自定义内容 -->
        </uni-list-chat>
        <uni-list-chat
            title="uni-app"
            avatar="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
            note="您收到一条新的消息"
            time="刚刚"
            badge-positon="left"
            badge-text="99">
          <!-- 此处可自定义内容 -->
        </uni-list-chat>
      </uni-list>
    </uni-list>
  </view>
</view>
</template>

<script lang="ts" setup>

import {ref} from "vue";

const rightText = new Date().toLocaleTimeString()
</script>

<style scoped>

</style>
