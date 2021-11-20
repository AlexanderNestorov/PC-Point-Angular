import {Product} from "./Product";
import {User} from "./User";

export class Order{
  id: number;
  products: Product[];
  buyer: User;
  expected: Date;
  total: number;
}
