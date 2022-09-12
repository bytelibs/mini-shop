<template>
  <view class="goods-detail">
    <view class="goods-img">
      <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="false">
        <swiper-item v-for="(item, index) in goodsInfo.imgList" :key="index">
          <view class="swiper-item">
            <image class="banner" :src="item.img"/>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <view class="goods-info">
      <uni-row>
        <uni-col :span="24">
          <text class="goods-title">{{ goodsInfo.title }}</text>
        </uni-col>
      </uni-row>
      <uni-row>
        <uni-col :span="24">
          <text class="goods-price">
            <text class="unit">￥</text>
            <text class="price">{{ goodsInfo.price }}</text>
          </text>
        </uni-col>
      </uni-row>
    </view>

    <view class="goods-detail-item">
      <uni-row>
        <view>
          <view @click="openPopup">
            <uni-col :span="24">
              <text v-if="!selectedGoodsItem.specName">选择规格</text>
              <text v-else>
                已选：{{selectedGoodsItem.specName}} * {{selectedGoodsItem.num}}
              </text>
            </uni-col>
          </view>
          <uni-popup ref="popup" type="bottom" :safe-area="true" background-color="#FFFFFF">
            <view class="popup-selected-spec">
              <view class="goods-item">
                <image class="goods-mini-img" :src="selectedGoodsItem.img"/>
                <view class="goods-text">
                  <text class="goods-price">
                    <text class="unit">￥</text>
                    <text class="price">{{ selectedGoodsItem.price }}</text>
                  </text>
                  <text class="goods-selected">
                    <text>已选：</text>
                    <text v-if="selectedGoodsItem.specName">
                      {{selectedGoodsItem.specName}} * {{selectedGoodsItem.num}}
                    </text>
                  </text>
                </view>

              </view>
              <uni-section class="mb-10" title="颜色">
                <view class="goods-spec">
                  <uni-data-checkbox mode="tag" v-model="radioValue" :localdata="goodsInfo.spec" @change="changeColor"/>
                </view>
              </uni-section>

              <uni-section class="mb-10" title="数量">
                <view class="goods-spec">
                  <uni-number-box :min="1" :max="99" @change="changeBuyNum" />
                </view>
              </uni-section>
            </view>
            <view class="popup-bottom-button">
              <view class="add-to-cart">
                <text>加入购物车</text>
              </view>
              <view class="buy-now">
                <text>立即购买</text>
              </view>
            </view>
          </uni-popup>
        </view>
      </uni-row>
    </view>

    <view class="shop-info">
      <view class="shop-logo-box">
        <image class="shop-logo" src="https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/logo/logo.png"/>
      </view>
      <view class="shop-desc">
        <view class="shop-name">
          <text>Apple官方旗舰店</text>
        </view>
      </view>
      <view class="shop-enter-button">
        <text>进店逛逛</text>
      </view>
    </view>

    <view class="goods-intro">
<!--      <scroll-view scroll-y="{{true}}" style="width:100%;height:{{sysheight}}px;">-->
<!--        <view class="img-size">-->
<!--          <image src="/static/img/goods/detail.png" mode="widthFix" class="liucheng-img"></image>-->
<!--        </view>-->
<!--      </scroll-view>-->
      <uni-segmented-control :current="current" :values="tabButtons" @clickItem="onClickItem" styleType="text" activeColor="#e43d33"></uni-segmented-control>
      <view class="content">
        <view v-show="current === 0">
          <rich-text :nodes="goodsInfo.detail" />
        </view>
        <view v-show="current === 1">
          选项卡2的内容
        </view>
      </view>
    </view>

    <view class="bottom-bar">
      <uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick"
                     @buttonClick="buttonClick"/>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const indicatorDots = ref(true);
const popup = ref();
const tabButtons = ref(['详情','评论'])
let current = ref(0)

const goodsInfo = ref({
  id: 1,
  title: 'Iphone 13 Pro Max 256G 全网通 国行正品',
  price: '5000.00',
  star: true,
  detail: '<img style="max-width: 100%; height: auto" src="https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/detail.png" mode="widthFix"/>',
  imgList: [
    {
      id: 1,
      img: `https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg`
    }, {
      id: 2,
      img: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_2.jpg'
    }, {
      id: 3,
      img: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_3.jpg'
    }
  ],
  spec: [
    {
      value: 1,
      img: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
      text: '石墨色',
      price: '5000.00'
    }, {
      value: 2,
      img: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_2.jpg',
      text: '远峰蓝',
      price: '5100.00'
    }, {
      value: 3,
      img: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_3.jpg',
      text: '银色',
      price: '5099.00'
    }

  ]
});

const selectedGoodsItem = ref({
  id: '',
  specName: '',
  img: '',
  price: '',
  num: 1
})

const radioValue = ref(selectedGoodsItem.value.id)

const options = ref([
  {
    icon: 'chat',
    text: '客服'
  }, {
    icon: 'shop',
    text: '店铺'
  }, {
    icon: goodsInfo.value.star ? 'star-filled' : 'star',
    text: '收藏'
  }
]);

const buttonGroup = ref([
  {
    text: '加入购物车',
    backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
    color: '#fff'
  },
  {
    text: '立即购买',
    backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
    color: '#fff'
  }
]);

const onClick = (e: any) => {
  goodsInfo.value.star = !goodsInfo.value.star
  e.content.icon = goodsInfo.value.star ? 'star-filled' : 'star'
  let text = ''
  text = goodsInfo.value.star ? '已收藏' : '已取消收藏'
  uni.showToast({
    title: text,
    icon: "none"
  })
}

const openPopup = () => {
  console.log('打开popup')
  popup.value.open('bottom')

  resetSelected()

}

const resetSelected = () => {
  selectedGoodsItem.value.img = goodsInfo.value.imgList[0].img
  selectedGoodsItem.value.price = goodsInfo.value.price
  selectedGoodsItem.value.specName = ''
  selectedGoodsItem.value.num = 1
  radioValue.value = ''
}

const changeColor = (e: any) => {
  console.log(e)
  const selected = e.detail.data
  selectedGoodsItem.value.id = selected.id
  selectedGoodsItem.value.img = selected.img
  selectedGoodsItem.value.price = selected.price
  selectedGoodsItem.value.specName = selected.text

}

const changeBuyNum = (value: number) => {
  selectedGoodsItem.value.num = value
}

const onClickItem = (e: any) => {
  if (current.value != e.currentIndex) {
    current.value = e.currentIndex;
  }
}

</script>

<style lang="scss" scoped>
.goods-detail {
  //height: 800rpx;
  //background-color: #FFFFFF;

  .goods-img {
    .swiper {
      height: 600rpx;

      .swiper-item {
        display: block;
        height: 100%;
        line-height: 600rpx;
        text-align: center;

        .banner {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .goods-info {
    //height: 200rpx;
    background-color: #FFFFFF;
    padding: 20rpx 30rpx;
    font-family: arial, sans-serif;
    border-bottom-left-radius: 30rpx;
    border-bottom-right-radius: 30rpx;

    .goods-title {
      font-size: 16px;
      font-weight: bold;
      display: -webkit-box;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .goods-price {
      color: #dd524d;
      margin-top: 10rpx;
      //position: absolute;
      display: flex;

      .unit {
        font-size: 10px;
      }

      .price {
        font-size: 16px;
        font-weight: bold
      }
    }


  }

  .goods-detail-item {
    margin-top: 20rpx;
    background-color: #FFFFFF;
    padding: 20rpx 30rpx;
    font-size: 30rpx;
    font-family: arial, sans-serif;
    color: rgb(192, 192, 192);
    border-radius: 30rpx;

    .popup-selected-spec {
      height: 800rpx;
      //background-color: #FFFFFF;

      .goods-item {
        padding: 40rpx;
        display: flex;
        border-bottom: 1px solid #ebeef5;
        //position: absolute;
        .goods-mini-img {
          width: 100rpx;
          height: 100rpx;
          border-radius: 10rpx;
          //border: 2rpx soild black;
        }

        .goods-text {
          margin-top: 10rpx;
          margin-left: 50rpx;
          .goods-price {
            color: #dd524d;
            display: flex;
            .unit {
              font-size: 10px;
            }
            .price {
              font-size: 16px;
              font-weight: bold
            }
          }
          .goods-selected {
            margin-top: 20rpx;
            display: flex;
          }
        }
      }
      .goods-spec {
        margin-left: 30rpx;
      }
    }
    .popup-bottom-button {
      height: 80rpx;
      display: flex;
      flex: 1;
      color: rgb(255, 255, 255);
      .add-to-cart {
        display: flex;
        flex: 1;
        margin: 0 30rpx 0 50rpx;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-radius: 50rpx;
        background: linear-gradient(90deg, rgb(255, 205, 30), rgb(255, 138, 24));
      }
      .buy-now {
        display: flex;
        flex: 1;
        margin: 0 50rpx 0 30rpx;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-radius: 50rpx;
        background: linear-gradient(90deg, rgb(254, 96, 53), rgb(239, 18, 36));
      }

    }
  }

  .shop-info {
    height: 160rpx;
    background-color: #FFFFFF;
    margin-top: 20rpx;
    border-radius: 30rpx;
    display: flex;
    .shop-logo-box {
      padding: 30rpx;
      height: 100rpx;
      width: 100rpx;
      border-radius: 10rpx;
      overflow: hidden;
      .shop-logo {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .shop-desc {
      flex: 1;
      .shop-name {
        font-weight: bold;
        font-family: 'Helvetica Neue', Helvetica, sans-serif;
        line-height: 160rpx;
      }

    }
    .shop-enter-button {
      line-height: 160rpx;
      padding-right: 30rpx;
      text {
        color: rgb(255, 138, 24);
        font-size: 24rpx;
        padding: 5rpx 15rpx;
        border: 1rpx solid rgb(254, 96, 53);
        border-radius: 10rpx;
      }
    }

  }
  .goods-intro {
    //height: 160rpx;
    background-color: #FFFFFF;
    margin-top: 20rpx;
    border-radius: 30rpx;

    .content {
      margin-top: 30rpx;
      margin-bottom: calc(100rpx + env(safe-area-inset-bottom));
      display: inline-block;
    }
  }

  .bottom-bar {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: var(--window-left);
    right: var(--window-right);
    bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    background-color: #FFFFFF;
    padding-bottom: env(safe-area-inset-bottom);
  }
}


</style>
