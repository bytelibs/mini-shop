<template>
  <view>
    <uni-search-bar
        placeholder="输入搜索商品"
        bgColor="#EEEEEE"
        clearButton="auto"
        cancelButton="none"
        @blur="blur"
        @focus="focus"
        @confirm="search"/>
  </view>

  <view>
    <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
            :duration="duration">
      <swiper-item v-for="(item, index) in bannerList" :key="index">
        <view class="swiper-item">
          <image class="banner" :src="item.img"/>
        </view>
      </swiper-item>
    </swiper>
  </view>

  <view>
    <uni-grid :column="3" :showBorder="false">
      <uni-grid-item v-for="(item, index) in gridList" :key="index">
        <uni-icons :type="item.icon" :size="30" color="#777"/>
        <text class="text">{{ item.text }}</text>
      </uni-grid-item>
    </uni-grid>
  </view>

  <view class="goods">
    <uni-row>
      <uni-col :span="12" v-for="(item, index) in goodsList" :key="index">
        <view class="goods-item" @click="viewGoods(item)">
          <image class="goods-img" :src="item.img"></image>
          <view class="goods-infos">
            <uni-row>
              <uni-col :span="24">
                <text class="goods-title">{{ item.title }}</text>
              </uni-col>
              <uni-col>
                <uni-row>
                  <uni-col :span="12">
                    <text class="goods-price">
                      <text class="unit">￥</text>
                      <text class="price">{{ item.price }}</text>
                    </text>
                  </uni-col>
                  <uni-col :span="12">
                    <text class="goods-sales-count">
                      <text>销量</text>
                      <text>{{ item.sales }}</text>
                    </text>
                  </uni-col>
                </uni-row>
              </uni-col>
            </uni-row>
          </view>
        </view>
      </uni-col>
    </uni-row>
  </view>

</template>

<script setup lang="ts">
import {ref} from 'vue';
import {GoodsItem} from "@/types/goods";

const indicatorDots = ref(true);
const autoplay = ref(true);
const interval = ref(3000);
const duration = ref(1500);

const bannerList = ref([
  {
    id: 1,
    img: '/static/img/banner1.jpg'
  }, {
    id: 2,
    img: '/static/img/banner2.jpg'
  }, {
    id: 3,
    img: '/static/img/banner3.jpg'
  }
])

const gridList = ref([
  {
    icon: 'phone-filled',
    text: '手机'
  }, {
    icon: 'phone',
    text: '电脑'
  }, {
    icon: 'phone',
    text: '家电'
  }
])

const goodsList = ref([
  {
    id: 1,
    img: '/static/img/goods/goods_1.jpg',
    title: 'Iphone 13 Pro Max 256G 全网通 国行正品',
    price: '5000.00',
    sales: 1000
  }, {
    id: 2,
    img: '/static/img/goods/goods_2.jpg',
    title: 'Iphone 13 Pro Max',
    price: '5000.00',
    sales: 1000
  }, {
    id: 3,
    img: '/static/img/goods/goods_3.jpg',
    title: 'Iphone 13 Pro Max',
    price: '5000.00',
    sales: 1000
  }
])


const viewGoods = (row: GoodsItem) => {
  console.log("查看商品", row.id)
  uni.navigateTo({url: '/pages/goods/index?goodsId=' + row.id})
}

</script>

<style lang="scss">
.swiper {
  height: 300rpx;
  .swiper-item {
    display: block;
    height: 300rpx;
    line-height: 300rpx;
    text-align: center;
    .banner {
      width: 100%;
      height: 100%;
    }
  }
}

.text {
  font-size: 14px;
  margin-top: 5px;
}

.uni-grid-item__box {
  align-items: center;
  justify-content: center;
}

.goods-item {
  width: auto;
  height: 450rpx;
  background-color: #FFFFFF;
  margin: 5rpx;
  //border: 1rpx solid #FFFFFF;
  border-radius: 25rpx;
  overflow: hidden;
  .goods-img {
    width: 100%;
    height: 350rpx;
  }
  .goods-infos {
    margin: 6rpx 10rpx;
    .goods-title {
      font-size: 16px;
      font-family: arial,sans-serif;
      display: -webkit-box;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    .goods-price {
      color: #dd524d;
      font-family: arial,sans-serif;
      .unit {
        font-size: 10px;
      }
      .price {
        font-size: 14px;
        font-weight: bold
      }
    }
    .goods-sales-count {
      //margin-right: 10rpx;;
      text-align: right;
      font-size: 10px;
      color: #999999;
    }
  }

}

//.grid-item-box {
//  flex: 1;
//  // position: relative;
//  /* #ifndef APP-NVUE */
//  display: flex;
//  /* #endif */
//  flex-direction: column;
//  align-items: center !important;
//  justify-content: center !important;
//  padding: 15px 0;
//}
</style>
