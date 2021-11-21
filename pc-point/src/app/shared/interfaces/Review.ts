import {User} from "./User";
import {Product} from "./Product";

export class Review {
  id: number;
  text: string;
  reviewer: User;
  product: Product;
  created: Date;
}
