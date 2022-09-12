import {CartGoodsItem} from "@/types/goods";

export class CartItem {
  cartId: number;
  shopName: string;
  allChecked?: boolean = false;
  goodsList: CartGoodsItem[]


  constructor(cartId: number, shopName: string, allChecked: boolean = false, goodsList: CartGoodsItem[]) {
    this.cartId = cartId;
    this.shopName = shopName;
    this.allChecked = allChecked;
    this.goodsList = goodsList;
  }
}


