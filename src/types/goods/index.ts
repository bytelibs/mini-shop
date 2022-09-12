export class GoodsItem {
  id: number;
  img: string;
  title: string;
  price: string;
  sales: string;

  constructor(id: number, img: string, title: string, price: string, sales: string) {
    this.id = id;
    this.img = img;
    this.title = title;
    this.price = price;
    this.sales = sales;
  }
}

export class CartGoodsItem {
  id: number;
  img: string;
  title: string;
  price: string;
  sales: string;
  checked?: boolean;
  selectCount: number;

  constructor(id: number, img: string, title: string, price: string, sales: string, checked: boolean = true, selectCount: number) {
    this.id = id;
    this.img = img;
    this.title = title;
    this.price = price;
    this.sales = sales;
    this.checked = checked;
    this.selectCount = selectCount;
  }
}
