import { Food } from './Food';

export class CartItem {
  constructor(public food: Food) {}  // food is a Food object
  quantity: number = 1;
  price: number = this.food.price;
}
