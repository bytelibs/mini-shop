<template>
<view class="chat-container">
  <!-- 聊天记录区域 -->
  <scroll-view
      class="chat-content"
      scroll-y="true"
      :scroll-into-view="scrollToView"
      :scroll-with-animation="needScrollAnimation"
      :style="{height: paddingBottom}">
    <!-- 一条聊天记录  -->
    <view class="chat-item" v-for="(item, index) in historyMsg" :key="item.id">
      <!-- 时间  -->
      <view class="time" v-if="item.showTime">{{handleTime(item.time)}}</view>
      <!-- b - 对方的消息  -->
      <view class="content-wrapper-left" v-if="item.fromId !== uid" >
        <!-- 头像 -->
        <image class="avatar avatar-left" :src="item.avatar"/>
        <!-- 0 - 文字 -->
        <view class="chat-content-left" v-if="item.type === 0">{{item.msg}}</view>
        <!-- 1 - 图片 -->
        <view class="chat-image-left" v-if="item.type === 1">......</view>
        <!-- 2 - 语音 -->
        <view class="chat-voice-left" v-if="item.type === 2">......</view>
        <!-- 3 - 位置信息 -->
        <view class="chat-site-left" v-if="item.type === 3">......</view>
      </view>
      <!--a - 自己的信息-->
      <view class="content-wrapper-right" v-if="item.fromId === uid">
        <!-- 0 - 文字 -->
        <view class="chat-content-right" v-if="item.type === 0">{{item.msg}}</view>
        <!-- 1 - 图片 -->
        <view class="chat-image-right" v-if="item.type === 1">......</view>
        <!-- 2 - 语音 -->
        <view class="chat-voice-right" v-if="item.type === 2">......</view>
        <!-- 3 - 位置信息 -->
        <view class="chat-site chat-site-right" v-if="item.type === 3">......</view>
        <!-- 头像 -->
        <image class="avatar avatar-right" :src="item.avatar"/>
      </view>
    </view>
  </scroll-view>
  <!-- 底部操作区域 -->
  <view class="chat-input-bar" :style="inputBarBottomStyle">
    <view class="right-action">
      <uni-icons type="sound" size="30" @click="toggleMode"/>
    </view>
    <view class="input-box" >
      <input
          v-show="mode === 'input'"
          class="uni-input"
          :value="inputValue"
          :adjust-position="false"
          confirm-type="send"
          @focus="focusHandler"
          @blur="blurHandler"
          placeholder=""/>
      <button class="voice-btn"
              type="default"
              v-show="mode === 'voice'"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd">按住 说话</button>
    </view>
    <view class="left-action">
      <uni-icons type="help" size="35" @click="openEmojiPanel"/>
    </view>
    <view class="left-action">
      <uni-icons type="plus" size="35" @click="openExpandPanel('expand')"/>
    </view>
  </view>
  <!-- 扩展面板 -->
  <view v-if="showExpandPanel" class="expand-panel">
    <uni-grid :column="5" :highlight="true" :show-border="false" @change="handleClickExpandBtn">
      <uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
        <view class="grid-item-box">
          <image :src="item.url" class="image" mode="aspectFill"/>
          <text class="text">{{ item.text }}</text>
        </view>
      </uni-grid-item>
    </uni-grid>
  </view>
  <!-- 表情面板 -->
  <view v-if="showEmojiPanel" class="expand-panel">
    <!-- 因为swiper特性的关系，请指定swiper的高度 ，swiper的高度并不会被内容撑开-->
    <swiper class="swiper" :indicator-dots="true">
      <swiper-item>
        <uni-grid :column="3" :highlight="true" @change="change">
          <uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
            <view class="grid-item-box">
              <image :src="item.url" class="image" mode="aspectFill" />
              <text class="text">{{ item.text }}</text>
            </view>
          </uni-grid-item>
        </uni-grid>
      </swiper-item>
      <swiper-item>
        <uni-grid :column="3" :highlight="true" @change="change">
          <uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
            <view class="grid-item-box">
              <image :src="item.url" class="image" mode="aspectFill" />
              <text class="text">{{ item.text }}</text>
            </view>
          </uni-grid-item>
        </uni-grid>
      </swiper-item>
      <swiper-item>
        <uni-grid :column="3" :highlight="true" @change="change">
          <uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
            <view class="grid-item-box">
              <image :src="item.url" class="image" mode="aspectFill" />
              <text class="text">{{ item.text }}</text>
            </view>
          </uni-grid-item>
        </uni-grid>
      </swiper-item>
    </swiper>
  </view>
</view>
  <!-- 语音遮罩层 -->
  <view class="voice-mask" v-show="showMask">
    <!--语音条 -->
    <view class="voice-bar voice-del" :class="{voiceDel:needCancel}" :style={width:getVoiceBarWidth}>
<!--      <image src="../static/icon/wave.png" class="voice-volume" :class="{volumeDel:needCancel}"></image>-->
      <view class="trangle-bottom" :class="{trangleDel:needCancel}"></view>
    </view>
    <!-- 底部区域 -->
    <view class="voice-send">
      <!-- 取消和转文字图标 -->
      <view class="voice-middle-wrapper">
        <!-- 取消 -->
        <view class="voice-left-wrapper">
          <view class="cancel-del" :class="{delTip:needCancel}">松开 取消</view>
          <view class="voice-middle-inner close" :class="{bigger:needCancel}">
<!--            <image src="../static/icon/close-grey.png" class="close-icon"></image>-->
          </view>
        </view>
        <!-- 转文字 -->
        <view class="voice-middle-inner to-text">
          <text class="wen">文</text>
          <!-- <image src="" class="wen"></image> -->
        </view>
        <view class="send-tip" :class="{sendTipNone:needCancel}">松开 发送</view>
      </view>
      <!-- 底部语音按钮 -->
      <view class="mask-bottom">
<!--        <image src="../static/icon/voice-left.png"></image>-->
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {ref, onMounted, nextTick} from "vue";
const paddingBottom = ref('')
const bottomHeight = ref(0)
let systemInfo = {}

onMounted(() => {
  uni.getSystemInfo({
    success: (res: UniApp.GetSystemInfoResult) => {
      console.log(res)
      systemInfo = res
      // const height = getHeight('.chat-input-bar')
      console.log(bottomHeight.value)
      // paddingBottom.value = systemInfo.windowHeight - systemInfo.safeAreaInsets.bottom + 'px'
    }
  })
  console.log('窗口高度', systemInfo.windowHeight)
  console.log('底部高度', systemInfo.safeAreaInsets.bottom)
})
const uid = ref(0)
const historyMsg = ref([
  {
    id: 1,
    time: '2022-09-19 20:00:00',
    fromId: 1,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '在吗？？？？'
  }, {
    id: 0,
    time: '2022-09-19 20:00:00',
    fromId: 0,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '不在！！！！'
  }, {
    id: 1,
    time: '2022-09-19 20:00:00',
    fromId: 1,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '在吗？？？？'
  }, {
    id: 0,
    time: '2022-09-19 20:00:00',
    fromId: 0,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '不在！！！！'
  }, {
    id: 1,
    time: '2022-09-19 20:00:00',
    fromId: 1,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '在吗？？？？'
  }, {
    id: 0,
    time: '2022-09-19 20:00:00',
    fromId: 0,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '不在！！！！'
  }, {
    id: 1,
    time: '2022-09-19 20:00:00',
    fromId: 1,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '在吗？？？？'
  }, {
    id: 0,
    time: '2022-09-19 20:00:00',
    fromId: 0,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '不在！！！！'
  }, {
    id: 1,
    time: '2022-09-19 20:00:00',
    fromId: 1,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '在吗？？？？'
  }, {
    id: 0,
    time: '2022-09-19 20:00:00',
    fromId: 0,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '不在！！！！'
  }, {
    id: 1,
    time: '2022-09-19 20:00:00',
    fromId: 1,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '在吗？？？？'
  }, {
    id: 0,
    time: '2022-09-19 20:00:00',
    fromId: 0,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '不在！！！！'
  }, {
    id: 1,
    time: '2022-09-19 20:00:00',
    fromId: 1,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '在吗？？？？'
  }, {
    id: 0,
    time: '2022-09-19 20:00:00',
    fromId: 0,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '不在！！！！'
  }, {
    id: 1,
    time: '2022-09-19 20:00:00',
    fromId: 1,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '在吗？？？？'
  }, {
    id: 0,
    time: '2022-09-19 20:00:00',
    fromId: 0,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '不在！！！！'
  }, {
    id: 1,
    time: '2022-09-19 20:00:00',
    fromId: 1,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '在吗？？？？'
  }, {
    id: 0,
    time: '2022-09-19 20:00:00',
    fromId: 0,
    type: 0,
    avatar: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
    showTime: false,
    msg: '不在！！！！'
  }
])

const scrollToView = ref('')
const scrollViewHeight = ref('')
const statusBarHeight = ref(0)
const needScrollAnimation = ref(true)


const reverseMsg = ref([])

// 弹出菜单栏修改scroll-view高度
const handleHeightChange = (height: number) => {
  scrollViewHeight.value = `calc(100vh - 208rpx - ${height}px - ${statusBarHeight}px)`;
  scrollToView.value = '';
  nextTick(() => {
    scrollToView.value = 'msg' + historyMsg.value[historyMsg.value.length - 1].id;
  })
}

// 获取指定选择器元素的高度
const getHeight = (classNa: string) => {
  return setTimeout(() => {
    const query = uni.createSelectorQuery().in(this);
    query.select(classNa).boundingClientRect(data => {
      // this.$emit('heightChange', data.height);
      return data.height
    }).exec();
  },10);
}


const mode = ref('input')
const inputValue = ref('')
const inputBarBottomStyle = ref('');
const showExpandPanel = ref(false);
const showEmojiPanel = ref(false);
const showMask = ref(false)


const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();

const list = ref([
  {
    url: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/main/picture.png',
    text: '图片'
  },
  {
    url: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/main/camera.png',
    text: '拍照'
  },
  {
    url: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/main/video.png',
    text: '视频'
  }
])



const toggleMode = () => {
  console.log('切换模式')
  showExpandPanel.value = false
  showEmojiPanel.value = false
  inputBarBottomStyle.value = 'bottom: 0'
  mode.value = mode.value === 'input' ? 'voice' : 'input'
}

const focusHandler = (e: any) => {
  console.log('输入框获得焦点', e)
  showExpandPanel.value = false
  showEmojiPanel.value = false
  inputBarBottomStyle.value = 'bottom: ' + e.detail.height + 'px; padding-bottom: 20rpx;'
  handleHeightChange(e.detail.height)
}
const blurHandler = () => {
  if (!showExpandPanel.value || !showEmojiPanel.value) {
    inputBarBottomStyle.value = 'bottom: 0'
  }
}

const containerClick = () => {
  showExpandPanel.value = false
}

const openEmojiPanel = () => {
  console.log('打开表情面板')
  if (showExpandPanel.value) {
    showExpandPanel.value = !showExpandPanel.value
  }
  showEmojiPanel.value = !showEmojiPanel.value
  mode.value = 'input'
  if (showEmojiPanel.value) {
    const safeAreaHeightPx = rpxToPx(350)
    console.log('px', safeAreaHeightPx)
    const safeAreaHeight = systemInfo.safeAreaInsets.bottom
    let bottom = safeAreaHeight ? safeAreaHeight + safeAreaHeightPx : safeAreaHeightPx
    inputBarBottomStyle.value = 'bottom: ' + bottom + 'px; padding-bottom: 20rpx;'
  } else {
    inputBarBottomStyle.value = 'bottom: 0'
  }
  bottomHeight.value = getHeight('.chat-input-bar')

  // getHeight('.more-view');
}

const openExpandPanel = (type: string) => {
  console.log('打开扩展面板')
  if (showEmojiPanel.value) {
    showEmojiPanel.value = !showEmojiPanel.value
  }
  showExpandPanel.value = !showExpandPanel.value
  mode.value = 'input'
  if (showExpandPanel.value) {
    const safeAreaHeightPx = rpxToPx(350)
    console.log('px', safeAreaHeightPx)
    const safeAreaHeight = systemInfo.safeAreaInsets.bottom
    let bottom = safeAreaHeight ? safeAreaHeight + safeAreaHeightPx : safeAreaHeightPx
    inputBarBottomStyle.value = 'bottom: ' + bottom + 'px; padding-bottom: 20rpx;'
  } else {
    inputBarBottomStyle.value = 'bottom: 0'
  }
  bottomHeight.value = getHeight('.chat-input-bar')
  // getHeight('.more-view');
}

const handleClickExpandBtn = (e: any) => {
  const index = e.detail.index
  switch (index) {
    case 0:
      console.log('打开相册')
      openAlbum()
      break;
    case 1:
      console.log('打开相机')
      openCamera(['camera'])
      break;
    case 2:
      console.log('打开摄像机')
      openVideo(['camera'])
      break;
    default:
      break;
  }
}

const openAlbum = () => {
  uni.chooseMedia({
    sourceType: ['album'], //这要注意，camera掉拍照，album是打开手机相册
    success: (res) => {
      console.log(res);
    }
  })
}

const openCamera = (type: string[]) => {
  uni.chooseImage({
    sourceType: type, //这要注意，camera掉拍照，album是打开手机相册
    success: (res) => {
      console.log(res);
    }
  })
}

const openVideo = (type: string[]) => {
  uni.chooseVideo({
    sourceType: type,
    success: (res) => {
      console.log(res);
    }
  })
}

const handleTouchStart = (e: any) => {
  console.log('触摸按钮', e)
  recorderManager.start({duration: 600000})
}
const handleTouchMove = () => {
  console.log('按住滑动')
}
const handleTouchEnd = () => {
  console.log('松开按钮')
  let voice = '';
  recorderManager.stop();
  recorderManager.onStop((res) => {
    console.log(res)
    voice = res.tempFilePath
    // const message = {
    //   voice:res.tempFilePath,
    //   length:this.length
    // };
    // if(!this.needCancel){
    //   this.inputSubmit(message,2);
    // }
    // this.needCancel = false
  })
  setTimeout(() => {
    console.log(voice)
  }, 1000)

  innerAudioContext.src = voice;
  innerAudioContext.play()
}


const rpxToPx = (rpx: number) => {
  console.log(rpx)
  return (systemInfo.windowWidth / 750) * rpx;
}
</script>

<style lang="scss" scoped>
.chat-container {
  //height: 600rpx;
  height: 100vh;
  .chat-content {
    display: flex;
    flex-direction: column;
    .chat-item {
      margin: 20rpx 20rpx;
      /* 左侧信息 */
      .content-wrapper-left {
        //flex-direction: row;
        display: flex;
        text-align: left;
        .avatar {
          height: 75rpx;
          width: 75rpx;
          border-radius: 10rpx;
          //flex: 1;
          //flex: none;
        }
        .avatar-left {

        }
        .chat-content-left {
          background-color: #FFFFFF;
          border-radius: 10rpx;
          padding: 15rpx 20rpx;
          margin-left: 16rpx;
        }
      }

      /* 右侧信息 */
      .content-wrapper-right {
        //flex: none;
        justify-content: flex-end;
        text-align: right;
        display: flex;
        //flex-direction: row-reverse;
        .avatar {
          height: 60rpx;
          width: 60rpx;
          border-radius: 10rpx;
          //flex: none;
        }
        .avatar-right {

        }
        .chat-content-right {
          background-color: #4cd964;
          border-radius: 10rpx;
          padding: 15rpx 20rpx;
          margin-right: 16rpx;
        }
      }
    }
  }
  .chat-input-bar {
    z-index: 1024;
    padding-top: 20rpx;
    bottom: 0;
    width: 100%;
    display: flex;
    position: fixed;
    background-color: rgb(246, 246, 246);
    box-shadow: 0 -1rpx 6rpx rgba(0, 0, 0, 0.1);
    align-items: center;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    .right-action {
      margin-left: 20rpx;
    }
    .input-box {
      flex: 1;
      input {
        overflow: initial;
        border-radius: 10rpx;
        background-color: #FFFFFF;
        line-height: 33rpx;
        height: 64rpx;
        min-height: 64rpx;
        font-size: 30rpx;
        margin: 0 25rpx;
        padding: 0 15rpx;
      }
      .voice-btn {
        font-size: 30rpx;
        font-weight: bold;
        height: 64rpx;
        display:flex;
        align-items: center;
        justify-content: center;
        background-color: #FFFFFF;
        margin: 0 25rpx;
      }
    }
    .left-action {
      margin-right: 20rpx;
    }
  }
  .expand-panel {
    width: 100%;
    height: 350rpx;
    //display: flex;
    position: fixed;
    bottom: 0;
    background-color: #FFFFFF;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    .grid-item-box {
      flex: 1;
      // position: relative;
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 15px 0;

      .image {
        //height: 100%;
        //width: 100%;
        height: 60rpx;
        width: 60rpx;
      }
      .text {
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
}


.voice-mask{
  position:fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  /* display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center; */
  background-color: rgba(0,0,0,0.8);
}
.voice-bar{
  position: absolute;
  left:50%;
  top: 50%;
  transform: translate(-50%,-30%);
  /* width: 230rpx; */
  height:150rpx;
  background-color:#51ff50;
  border-radius: 26rpx;
  margin-bottom: 220rpx;
}
.voiceDel{
  left:80rpx;
  top: 50%;
  width: 170rpx !important;
  transform: translateX(0%);
  transform: translateY(-30%);
  background-color: red;
}
.voice-volume{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 160rpx;
  height: 36rpx;
}
.volumeDel{
  width: 80rpx;
}
.trangle-bottom{
  position: absolute;
  bottom: -38rpx;
  left:50%;
  transform: translateX(-50%);
  border-width: 20rpx;
  border-style: solid;
  border-color: #51FF50 transparent transparent transparent;
}
.trangleDel{
  border-color: red transparent transparent transparent;
}
.voice-send{
  position: absolute;
  bottom: 0;
  width: 100%;
}
.voice-middle-wrapper{
  width: 100%;
  display: flex;
  position:relative;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40rpx;
}
.voice-left-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
.cancel-del{
  display:none;
}
.delTip{
  display:block;
  color:#bfbfbf;
  margin: 0 22rpx 18rpx 0;
}
.voice-middle-inner{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.2);
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
}
.close{
  transform: rotate(350deg);
  margin-left: 80rpx;
}
.bigger{
  width: 170rpx;
  height: 170rpx;
}
.to-text{
  transform: rotate(10deg);
  margin-right: 80rpx;
}
.close-icon{
  width: 80rpx;
  height: 80rpx;
}
.wen{
  font-size: 40rpx;
  color:#bfbfbf;
}
.send-tip{
  position: absolute;
  left: 50%;
  bottom:0rpx;
  transform: translate(-50%,36%);
  color:#bfbfbf;
}
.sendTipNone{
  display: none;
}
.mask-bottom{
  position: relative;
  width: 100%;
  height:190rpx;
  border-top: #BABABB 8rpx solid;
  border-radius: 300rpx 300rpx 0 0;
  background-image: linear-gradient(#949794,#e1e3e1);
}
.mask-bottom image{
  position: absolute;
  width: 60rpx;
  height: 60rpx;
  top: 0;
  right:0;
  bottom: 0;
  left: 0;
  margin: auto;
}

</style>
