export interface Menu {
  id?: string;
  name: string;
  type: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface MenuProduct {
  id?: string;
  productId: string;
  menuType: string;
  createdAt?: Date;
  updatedAt?: Date;
}
