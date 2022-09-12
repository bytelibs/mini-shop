<template>
  <view class="cart-container">
    <view class="cart-item" v-for="(item, index) in cartList" :key="index">
      <view class="item-infos">
        <view class="item-title">
          <view class="item-checkbox">
            <checkbox-group @change="selectAll(item)">
              <label>
                <checkbox class="all-select" :checked="item.allChecked"/>
              </label>
            </checkbox-group>
          </view>
          <text>{{ item.shopName }}</text>
        </view>
        <view v-for="(goodsItem, goodsIndex) in item.goodsList" :key="goodsIndex">
          <uni-swipe-action style="width: 100%">
            <uni-swipe-action-item
                :right-options="options"
                :key="goodsItem.id"
                @click="bindClick">
              <view class="item-detail">
                <view class="item-checkbox">
                  <checkbox-group @change="selected(goodsItem, item)">
                    <label>
                      <checkbox class="item-select" :checked="goodsItem.checked"/>
                    </label>
                  </checkbox-group>
                </view>
                <view class="goods-img">
                  <image :src="goodsItem.img"/>
                </view>
                <view class="goods-detail">
                  <view class="goods-title">
                    <text>{{ goodsItem.title }}</text>
                  </view>
                  <view class="goods-price-count">
                    <text class="goods-price">
                      <text class="unit">￥</text>
                      <text class="price">{{ goodsItem.price }}</text>
                    </text>
                    <view class="goods-count">
                      <uni-number-box
                          :value="goodsItem.selectCount"
                          :min="1"
                          :max="99"
                          @change="($value: number) => { changeBuyNum($value, goodsItem);}"/>
                    </view>
                  </view>
                </view>
              </view>
            </uni-swipe-action-item>
          </uni-swipe-action>
        </view>
      </view>
    </view>
    <view class="bottom-bar">
      <view class="bottom-left">
        <view class="total-price-box">
          <text>合计：</text>
          <text class="goods-price">
            <text class="unit">￥</text>
            <text class="price">{{totalAmount}}</text>
          </text>
        </view>
      </view>
      <view class="bottom-right">
        <text>结算</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {reactive, ref, computed} from "vue";
import {CartItem} from "@/types/cart";
import {CartGoodsItem, GoodsItem} from "@/types/goods";

const cartList: CartItem[] = reactive([
  {
    cartId: 1,
    shopName: 'XXX旗舰店',
    goodsList: [
      {
        id: 1,
        title: 'XXXXXXXXX',
        img: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_1.jpg',
        price: '5500.00',
        sales: '1000',
        selectCount: 1
      }, {
        id: 2,
        title: 'XXXXXXXXX',
        img: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_2.jpg',
        price: '5500.00',
        sales: '1000',
        selectCount: 1
      }
    ]
  }, {
    cartId: 2,
    shopName: 'XXX旗舰店',
    goodsList: [
      {
        id: 1,
        title: 'XXXXXXXXX',
        img: 'https://bytelibs-dev.oss-cn-beijing.aliyuncs.com/image/goods/goods_3.jpg',
        price: '5500.00',
        sales: '1000',
        selectCount: 1
      }
    ]
  }
])

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

const selectAll = (item: CartItem) => {
  if (undefined === item.allChecked) {
    item.allChecked = false
  }
  item.allChecked = !item.allChecked
  item.goodsList.forEach(goods => {
    goods.checked = item.allChecked;
  })
}

const selected = (item: CartGoodsItem, cartItem: CartItem) => {
  item.checked = !item.checked
  let newArr: GoodsItem[] = cartItem.goodsList.filter(i => (i.checked === true))
  cartItem.allChecked = newArr.length === cartItem.goodsList.length;
}


const changeBuyNum = (value: number, goodsItem: CartGoodsItem) => {
  goodsItem.selectCount = value;
}

const totalAmount = computed(() => {
  let totalAmount = 0;
  cartList.forEach(cartItem => {
    cartItem.goodsList.filter(goodsItem => (goodsItem.checked === true)).forEach(item => {
      totalAmount = totalAmount + Number.parseFloat(item.price) * item.selectCount
    })
  })
  return totalAmount.toFixed(2)
})


</script>

<style lang="scss" scoped>
.cart-container {
  .cart-item {
    margin: 20rpx;
    border-radius: 20rpx;
    background-color: #FFFFFF;

    .item-infos {
      padding: 20rpx;
      //margin-left: 60rpx;
      .item-title {
        display: flex;

        .item-checkbox {
          .all-select {
            transform: scale(0.7);
          }
        }

        //margin-left: 60rpx;
      }

      .item-detail {
        display: flex;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
        //line-height: 88rpx;
        align-items: center;

        .item-checkbox {
          .item-select {
            transform: scale(0.7);
          }
        }

        .goods-img {
          flex: 0;

          image {
            width: 100rpx;
            height: 100rpx;
            border-radius: 15rpx;
          }
        }

        .goods-detail {
          //display: flex;
          flex: auto;
          padding-left: 40rpx;

          .goods-title {

          }

          .goods-price-count {
            display: flex;

            .goods-price {
              color: #dd524d;
              margin-top: 10rpx;
              //position: absolute;
              display: flex;
              flex: auto;

              .unit {
                font-size: 10px;
              }

              .price {
                font-size: 16px;
                font-weight: bold
              }
            }

            .goods-count {
              margin-right: 25rpx;
            }
          }

        }
      }
    }
  }
  //flex: auto;
  .bottom-bar {
    height: 50px;
    background-color: #FFFFFF;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;

    .bottom-left {
      flex: 2;

      .total-price-box {
        display: flex;
        margin-left: 50rpx;
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
    }
    .bottom-right {
      color: rgb(255, 255, 255);
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      background: linear-gradient(90deg, rgb(255, 138, 24), rgb(254, 96, 53));
    }
  }
}
</style>
