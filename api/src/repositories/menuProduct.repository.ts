import { Injectable } from '@nestjs/common';

import prisma from '../config/database';
import { MenuProduct } from 'src/interfaces/menu.interface';
@Injectable()
export class MenuProductRepository {
  constructor() {}

  async findAll(): Promise<MenuProduct[]> {
    return prisma.menuProduct.findMany({});
  }

  async createMany(products: MenuProduct[]) {
    // const { product } = data;
    console.log(products);
    const createdMenuProducts = prisma.menuProduct.createMany({
      data: products,
    });
    return createdMenuProducts;
  }

  //   async update(id: string, product: Product): Promise<MenuProduct> {
  //     return prisma.product.update({ where: { id }, data: product });
  //   }

  async deleteByProductId(productId: string): Promise<any> {
    return prisma.menuProduct.deleteMany({ where: { productId } });
  }
}
