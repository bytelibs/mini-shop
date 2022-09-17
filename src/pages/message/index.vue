<template>
  <view class="message-container">
    <view>
      <uni-list :border="true">
        <uni-swipe-action style="width: 100%">
          <uni-swipe-action-item
              v-for="(item, index) in chatList" :key="index"
              :right-options="options"
              @click="bindClick">
            <!-- 头像显示角标 -->
            <uni-list-chat
                :title="item.nickname"
                :avatar="item.avatar"
                :note="item.lastMessage"
                :time="item.createTime"
                badge-positon="left"
                :badge-text="item.unread"
                clickable
                @click="openChat(item)">
              <!-- 此处可自定义内容 -->
            </uni-list-chat>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </uni-list>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const chatList = ref([
  {
    id: 1,
    nickname: '娃哈哈',
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/logo/logo.png',
    lastMessage: '在吗',
    unread: '1',
    createTime: '2022-09-17 21:33:00',
  }, {
    id: 2,
    nickname: '康师傅',
    avatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
    lastMessage: '在吗',
    unread: '1',
    createTime: '2022-09-17 21:33:00',
  }
])

const rightText = new Date().toLocaleTimeString()

const options = ref([
  {
    text: '删除',
    style: {
      backgroundColor: '#F56C6C'
    }
  }
])

const bindClick = (e: any) => {
  console.log(e);
  uni.showToast({
    title: `点击了${e.position === 'left' ? '左侧' : '右侧'} ${e.content.text}按钮`,
    icon: 'none'
  });
}

const openChat = (item: any) => {
  console.log(item)
  uni.navigateTo({url: '/pages/message/chat?chatId=' + item.id})
}
</script>

<style scoped>

</style>
