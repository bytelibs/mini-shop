<template>
  <view class="profile-container">
    <view class="profile-info">
        <view v-if="false" class="has-login">
            <view class="profile-avatar">
                <image src="https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/logo/logo.png"/>
            </view>
            <view class="profile-nickname">
                <text>Mr Tsui</text>
            </view>
        </view>
        <view v-else class="no-login">
            <button size="mini" type="primary" plain="true" open-type="getUserInfo" @getuserinfo="login">立即登录</button>
        </view>
    </view>

    <view class="order-center">
      <uni-section title="我的订单" type="line" padding>
        <template v-slot:right>
          <view class="order-more" @click="showAllOrder">全部</view>
        </template>
        <uni-grid :column="5" :show-border="false" :square="false" @change="handleOrderTypeChange">
          <uni-grid-item v-for="(item ,index) in orderBtnList" :index="index" :key="index">
            <view class="grid-item-box">
              <image class="image" :src="item.url" mode="aspectFill" />
              <text class="text">{{item.text}}</text>
              <view v-if="item.badge" class="grid-dot">
                <uni-badge :text="item.badge" :type="item.type" />
              </view>
            </view>
          </uni-grid-item>
        </uni-grid>
      </uni-section>
    </view>

    <view class="function-expand">
      <uni-grid :column="4" :show-border="false" :square="false" @change="change">
        <uni-grid-item v-for="(item ,index) in expandBtnList" :index="index" :key="index">
          <view class="grid-item-box">
            <image class="image" :src="item.url" mode="aspectFill" />
            <text class="text">{{item.text}}</text>
            <view v-if="item.badge" class="grid-dot">
              <uni-badge :text="item.badge" :type="item.type" />
            </view>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <view class="function-list">
      <uni-list>
<!--        <uni-list-item :show-extra-icon="true" showArrow :extra-icon="extraIcon" title="列表左侧带扩展图标"/>-->
        <uni-list-item
            title="个人中心"
            showArrow
            thumb="https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/order/address_dizhi.png"
            thumb-size="default"/>
        <uni-list-item
            title="设置"
            showArrow
            thumb="https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/order/address_dizhi.png"
            thumb-size="default"/>
        <uni-list-item
            title="关于"
            showArrow
            thumb="https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/order/address_dizhi.png"
            thumb-size="default"/>
      </uni-list>
    </view>
  </view>
</template>

<script lang="ts" setup>

import {ref} from "vue";
import {useUserStore} from "@/store/auth";
import {Base64} from "js-base64";

const userStore = useUserStore();

const orderBtnList = ref([
    {
        url: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/order/payment.png',
        text: '待付款',
        badge: 1,
        type: 'error'
    }, {
        url: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/order/daifahuo.png',
        text: '待发货',
        badge: 1,
        type: 'error'
    }, {
        url: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/order/daishouhuo.png',
        text: '待收货',
        badge: 1,
        type: 'error'
    }, {
        url: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/order/daipingjia.png',
        text: '待评价',
        badge: 1,
        type: 'error'
    }, {
        url: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/order/shouhou.png',
        text: '售后',
        badge: 1,
        type: 'error'
    }
])

const expandBtnList = ref([
    {
        url: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/order/payment.png',
        text: '我的收藏',
        badge: 0,
        type: 'error'
    }, {
        url: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/order/daifahuo.png',
        text: '我的足迹',
        badge: 0,
        type: 'error'
    }, {
        url: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/order/daishouhuo.png',
        text: '收货地址',
        badge: 0,
        type: 'error'
    }, {
        url: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/order/daipingjia.png',
        text: '我的评价',
        badge: 0,
        type: 'error'
    }
])

const login = () => {
    uni.login({
        provider: 'weixin',
        success: result => {
            if (result.code) {
                console.log(result.code)
                uni.request({
                    method: 'POST',
                    url: 'http://127.0.0.1:10001/authorization/oauth2/token?grant_type=wechat_mini_program&client_id=test&client_secret=123456&appid=wx3c4c615b24d3b72b&code=' + result.code,
                    success: (result: any) => {
                        console.log(result)
                        const access_token = result.data.access_token
                        userStore.SET_ACCESS_TOKEN(userStore, access_token)
                        userStore.SET_REFRESH_TOKEN(userStore, result.data.refresh_token)
                        userStore.SET_SCOPE(userStore, result.data.scope)

                        const firstDot = access_token.indexOf('.')
                        if (firstDot !== -1) {
                            const header  = JSON.parse(Base64.decode(access_token.substring(0, firstDot)));
                            const secondDot = access_token.indexOf('.', firstDot + 1);
                            if (secondDot != -1) {
                                const payload = JSON.parse(Base64.decode(access_token.substring(firstDot + 1, secondDot)));
                                console.log('openid', payload.sub)
                                const signature = access_token.substring(secondDot + 1)
                                // userStore.SET_OPENID(userStore, payload)
                                console.log('payload', payload)
                            }
                        }
                    }
                })
            }
        }, fail: err => {
            console.log(err)
        }
    })
}

const handleOrderTypeChange = (e: any) => {
    const index = e.detail.index
    uni.navigateTo({url: '/pages/order/index?orderType=' + index})
    // switch (index) {
    //   case 0:
    //     console.log('待付款')
    //     break;
    //   case 1:
    //     console.log('待发货')
    //     break;
    //   case 2:
    //     console.log('待收货')
    //     break;
    //   case 3:
    //     console.log('待评价')
    //     break;
    //   case 4:
    //     console.log('售后')
    //     break;
    //   default:
    //     break;
    // }
}

const showAllOrder = () => {
    uni.navigateTo({url: '/pages/order/index'})
}

</script>

<style lang="scss" scoped>
.profile-container {
  .profile-info {
    height: 200rpx;
    margin-top: 20rpx;
    background-color: #FFFFFF;
    border-radius: 20rpx;

    .has-login {
      display: flex;
      .profile-avatar {
        padding: 50rpx 40rpx;

        image {
          width: 100rpx;
          height: 100rpx;
          overflow: hidden;
          border-radius: 50%;
        }
      }

      .profile-nickname {
        flex: auto;
        margin-top: 50rpx;
        margin-left: 10rpx;

        text {
          font-weight: bold;
          font-family: 'Helvetica Neue', Helvetica, sans-serif;
        }
      }
    }
    .no-login {
      height: 200rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      //button {
      //  width: 50rpx;
      //  height: 50rpx;
      //}
    }
  }

  .order-center, .function-expand {
    margin-top: 15rpx;
    border-radius: 20rpx;
    background-color: #FFFFFF;
    .order-more {
      margin-right: 20rpx;
    }
    .grid-item-box {
      font-size: 24rpx;
      flex: 1;
      // position: relative;
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10rpx 0;
      .grid-item-box-row {

        flex: 1;
        // position: relative;
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        align-items: center;
        justify-content: center;
        //padding: 15px 0;
      }
      .grid-dot {
        position: absolute;
        top: -5rpx;
        right: 25rpx;
      }
    }
  }

  .function-expand {
    padding: 15rpx 0;
    //font-size: 24rpx;
  }

  .function-list {
    padding-top: 15rpx;
    border-radius: 20rpx;
  }
}
.image {
  width: 25px;
  height: 25px;
}
</style>
