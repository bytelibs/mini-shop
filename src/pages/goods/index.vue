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
              <text>选择：</text>
              <text v-if="selectedGoodsItem.specName">
                {{selectedGoodsItem.specName}} * {{selectedGoodsItem.num}}
              </text>
            </uni-col>
          </view>
          <uni-popup ref="popup" type="bottom" :safe-area="false">
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
              <view class="add-to-cart" type="primary">
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

const goodsInfo = ref({
  id: 1,
  title: 'Iphone 13 Pro Max 256G 全网通 国行正品',
  price: '5000.00',
  star: true,
  imgList: [
    {
      id: 1,
      img: `/static/img/goods/goods_1.jpg`
    }, {
      id: 2,
      img: '/static/img/goods/goods_2.jpg'
    }, {
      id: 3,
      img: '/static/img/goods/goods_3.jpg'
    }
  ],
  spec: [
    {
      value: 1,
      img: '/static/img/goods/goods_1.jpg',
      text: '石墨色',
      price: '5000.00'
    }, {
      value: 2,
      img: '/static/img/goods/goods_2.jpg',
      text: '远峰蓝',
      price: '5100.00'
    }, {
      value: 3,
      img: '/static/img/goods/goods_3.jpg',
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
      background-color: #FFFFFF;

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
      height: 100rpx;
      //position: relative;
      display: flex;
      flex: 1;
      
      color: rgb(255, 255, 255);
      .add-to-cart {
        //width: 200rpx;
        //height: 100rpx;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-radius: 50rpx;
        background: linear-gradient(90deg, rgb(255, 205, 30), rgb(255, 138, 24));
      }
      .buy-now {
        //width: 200rpx;
        //height: 100rpx;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-radius: 50rpx;
        background: linear-gradient(90deg, rgb(254, 96, 53), rgb(239, 18, 36));
      }

    }
  }

  .bottom-bar {
    display: flex;
    flex-direction: column;
    bottom: 35rpx;
    position: fixed;
    left: var(--window-left);
    right: var(--window-right);
  }
}


</style>
