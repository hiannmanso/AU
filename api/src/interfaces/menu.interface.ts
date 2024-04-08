export interface Menu {
  id?: string;
  name: string;
  type: string[];
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface MenuWithProducts extends Menu {
  productsId: string[];
}
export interface MenuProduct {
  id?: string;
  productId: string;
  menuId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface RegisterProductsOnMenu {
  count: number;
}

export interface MenuInfo {
  menuData: Menu;
  registerProductsOnMenu: RegisterProductsOnMenu;
}

export interface DeleteMenuBody {
  result: Menu;
  deleteProductMenu: {
    count: number;
  };
}

export interface BodyPutMenuResponse {
  updateMenu: Menu;
  resultPopulateMenuProduct: RegisterProductsOnMenu;
}
