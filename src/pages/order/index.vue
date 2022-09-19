<template>
  <view class="order-container">
    <view class="order-search-box">
      <uni-search-bar
          placeholder="输入搜索订单"
          bgColor="#EEEEEE"
          clearButton="auto"
          cancelButton="none"
          @confirm="search"/>
    </view>
    <view class="order-type-tab">
      <uni-segmented-control
          ref="orderTypeTab"
          :current="currentType"
          :values="orderTypeTabs"
          @clickItem="changeOrderType"
          styleType="text"
          activeColor="#f3a73f"></uni-segmented-control>
      <view class="content">
        <view class="order-content">
          <view class="order-item" v-for="(item, index) in orderList" :key="index">
            <view class="shop-name">
              <text>{{ item.shopName }}</text>
            </view>
            <view class="order-goods-item" v-for="(goodsItem, goodsIndex) in item.goodsList" :key="goodsIndex">
              <view class="goods-item">
                <view class="goods-image">
                  <image :src="goodsItem.img"/>
                </view>
                <view class="goods-info">
                  <view class="goods-title-box">
                    <text class="goods-title">{{ goodsItem.title }}</text>
                    <text class="goods-spec">{{ goodsItem.spec }}</text>
                  </view>
                </view>
                <view class="goods-price">
                  <text>{{ goodsItem.price }}</text>
                  <text>x{{ goodsItem.num }}</text>
                </view>
              </view>
            </view>
            <view class="order-bottom">
              <view class="total-price-box">
                <text>实付款：</text>
                <text class="goods-price">
                  <text class="unit">￥</text>
                  <text class="price">{{item.orderPrice}}</text>
                </text>
              </view>
              <view class="option-btn">

              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {onLoad} from "@dcloudio/uni-app";

let currentType = ref(0)

onLoad((options: any) => {
  currentType.value = Number.parseInt(options.orderType) + 1
})

const orderTypeTabs = ref(['全部', '待付款', '待发货', '待收货', '待评价'])

const orderList = ref([
  {
    shopName: 'Apple官方旗舰店',
    orderStatus: '待付款',
    orderPrice: '11000',
    goodsList: [
      {
        img: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
        title: 'Iphone 13 Pro Max',
        spec: '石墨色',
        price: '6000',
        num: '1',
        realPrice: '5500'
      }, {
        img: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
        title: 'Iphone 13 Pro Max 256G 全网通 国行正品',
        spec: '石墨色',
        price: '6000',
        num: '1',
        realPrice: '5500'
      }
    ]
  }, {
    shopName: 'Apple官方旗舰店',
    orderStatus: '待付款',
    orderPrice: '11000',
    goodsList: [
      {
        img: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
        title: 'Iphone 13 Pro Max',
        spec: '石墨色',
        price: '6000',
        num: '1',
        realPrice: '5500'
      }, {
        img: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
        title: 'Iphone 13 Pro Max 256G 全网通 国行正品',
        spec: '石墨色',
        price: '6000',
        num: '1',
        realPrice: '5500'
      }
    ]
  }

])


const search = (e: any) => {
  const keyword = e.value
}

const changeOrderType = (e: any) => {
  currentType.value = e.currentIndex
}
</script>

<style lang="scss" scoped>
.order-container {
  .order-search-box {

  }

  .order-type-tab {
    .content {
      .order-content {
        .order-item {
          //height: 300rpx;
          //margin: 20rpx 0;
          margin-top: 20rpx;
          padding: 20rpx 30rpx;
          border-radius: 20rpx;
          background-color: #FFFFFF;

          .shop-name {
            //padding: 0 0 0 30rpx;
          }

          .order-goods-item {
            //padding: 10rpx 0 0 30rpx;
            padding-top: 10rpx;

            .goods-item {
              display: flex;

              .goods-image {
                //width: 130rpx;
                //height: 130rpx;
                min-height: 130rpx;
                min-width: 130rpx;
                max-height: 130rpx;
                max-width: 130rpx;
                border-radius: 20rpx;
                overflow: hidden;

                image {
                  width: 100%;
                  height: 100%;
                }
              }

              .goods-info {
                padding-left: 15rpx;
                flex: auto;

                .goods-title-box {
                  text-align: left;

                  .goods-title {
                    display: -webkit-box;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                  }
                }
              }

              .goods-price {
                flex: 1;
                display: grid;
                text-align: right;
                right: 0;

                text {

                }
              }
            }
          }

          .order-bottom {
            border-top: #e9e9eb 1px solid;
            .total-price-box {
              display: flex;
              line-height: 100rpx;
              font-weight: bold;
              .goods-price {
                color: #dd524d;
                display: flex;
                flex: auto;
                .unit {
                  font-size: 10px;
                }
                .price {
                  font-size: 16px;
                }
              }
            }
            .option-btn {

            }
          }
        }
      }
    }
  }
}
</style>
