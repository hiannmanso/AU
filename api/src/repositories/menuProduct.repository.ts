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
    const createdMenuProducts = prisma.menuProduct.createMany({
      data: products,
    });
    return createdMenuProducts;
  }
  async deleteByProductId(productId: string): Promise<any> {
    return prisma.menuProduct.deleteMany({ where: { productId } });
  }
}
