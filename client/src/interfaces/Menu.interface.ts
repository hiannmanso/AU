import { Category } from "./Category.interface";
import { Product } from "./Product.interface";

export interface MenuObject {
  id: string;
  name: string;
  description: string;
  type: string[];
  createdAt: string;
  updatedAt: string;
}
interface ProductsMenu {
  createdAt: string;
  id: string;
  menuId: string;
  productId: string;
  updatedAt: string;
}
export interface MenuCarouselProps {
  data: any[];
  setSelectedItemData: React.Dispatch<React.SetStateAction<string[]>>;
  inputData: any;
  setInputsData: React.Dispatch<React.SetStateAction<any>>;
  setIsNewItem: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  currentItem: string | null;
  setCurrentItem: React.Dispatch<React.SetStateAction<string | null>>;
  updateListData: boolean;
  setUpdateListData: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface MenuDetails extends MenuObject {
  MenuProduct: ProductsMenu[];
}

export interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
}

export interface MenuInputs {
  id?: string;
  name: string;
  description: string;
  type: string[];
}
