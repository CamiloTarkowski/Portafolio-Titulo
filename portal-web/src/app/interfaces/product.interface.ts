export interface Product {
  id: number;
  code: string;
  name: string;
  stock: number;
  price: number;
  size: string;
  description: string;
  image: {
    url: string;
  };
  institution: {
    id: number;
    name: string;
  };
  quantity?: number;
}
