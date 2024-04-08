import { Injectable } from '@nestjs/common';
import {
  BodyPutMenuResponse,
  DeleteMenuBody,
  Menu,
  MenuInfo,
  MenuWithProducts,
} from '../interfaces/menu.interface';
import { MenuRepository } from '../repositories/menu.repository';
import { PutMenuDto } from '../schemas/menu.schema';
import { throwUnauthorizedException } from '../helper/error.helper';
import { ProductRepository } from 'src/repositories/product.repository';
import { MenuProductRepository } from 'src/repositories/menuProduct.repository';

@Injectable()
export class MenuService {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly productRepository: ProductRepository,
    private readonly menuProductRepository: MenuProductRepository,
  ) {}

  async findAll(): Promise<Menu[]> {
    return this.menuRepository.findAll();
  }

  async findById(id: string): Promise<Menu | null> {
    return this.menuRepository.findById(id);
  }
  async findCurrentMenu(): Promise<Menu[] | null> {
    const currentHour = new Date().getHours();
    let menuType: string;
    if (currentHour < 6 || currentHour >= 18) {
      menuType = 'night';
    } else {
      menuType = 'day';
    }
    const result = await this.menuRepository.findByType(menuType);
    return result;
  }

  async create(menu: MenuWithProducts): Promise<MenuInfo | null> {
    const existingMenu = await this.menuRepository.findByName(menu.name);
    if (existingMenu) {
      throwUnauthorizedException(
        'This menu already exists. please try other name',
      );
    }
    if (menu.productsId.length == 0) {
      throwUnauthorizedException(
        'It is necessary to associate products with the menu',
      );
    }
    await Promise.all(
      menu.productsId.map(async (id) => {
        const existingProduct = await this.productRepository.findById(id);

        if (!existingProduct) {
          throwUnauthorizedException('This productId does not exist.');
        }
      }),
    );
    const dataMenu = { ...menu };
    delete dataMenu.productsId;

    const menuData = await this.menuRepository.create(dataMenu);
    const dataMenuProduct = menu.productsId.map((productId) => {
      const data = {
        productId,
        menuId: menuData.id,
      };
      return data;
    });
    const registerProductsOnMenu =
      await this.menuProductRepository.createMany(dataMenuProduct);
    console.log(menuData, registerProductsOnMenu);
    return { menuData, registerProductsOnMenu };
  }

  async update(id: string, menu: PutMenuDto): Promise<BodyPutMenuResponse> {
    const existingMenu = await this.menuRepository.findById(id);
    if (!existingMenu) {
      throwUnauthorizedException('This menu does not exist.');
    }
    await Promise.all(
      menu.productsId.map(async (id) => {
        const existingProduct = await this.productRepository.findById(id);
        if (!existingProduct) {
          throwUnauthorizedException(
            'This product does not exist. please try other id.',
          );
        }
      }),
    );
    await this.menuProductRepository.deleteByMenuId(id);
    const dataMenu = { ...menu };
    delete dataMenu.productsId;
    const updateMenu = await this.menuRepository.update(id, dataMenu);
    const listDataMenuProduct = menu.productsId.map((item) => {
      return {
        productId: item,
        menuId: id,
      };
    });
    const resultPopulateMenuProduct =
      await this.menuProductRepository.createMany(listDataMenuProduct);
    return { updateMenu, resultPopulateMenuProduct };
  }

  async delete(id: string): Promise<DeleteMenuBody> {
    const existingMenu = await this.menuRepository.findById(id);
    if (!existingMenu) {
      throwUnauthorizedException('This menu does not exist.');
    }
    const deleteProductMenu =
      await this.menuProductRepository.deleteByMenuId(id);
    const result = await this.menuRepository.delete(id);
    return { result, deleteProductMenu };
  }
}
