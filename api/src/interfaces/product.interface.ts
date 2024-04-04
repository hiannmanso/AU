export interface Product {
  id?: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ProductSchemaReq extends Product {
  menuType: string[];
}

export interface CreateProductResult {
  createProduct: Product;
  createMenuProduct: {
    count: number;
  };
}
export interface DeleteResultProduct {
  deleteProduct: Product;
  deleteMenuProduct: {
    count: number;
  };
}
