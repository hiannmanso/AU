import { Injectable } from '@nestjs/common';
import { Product } from '../interfaces/product.interface';

import prisma from '../config/database';
import { PutProductDto } from 'src/schemas/product.schema';
@Injectable()
export class ProductRepository {
  constructor() {}

  async findAll(): Promise<Product[]> {
    return prisma.product.findMany({ include: { category: {} } });
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
  }
  async findByCategoryId(id: string): Promise<Product[]> {
    return prisma.product.findMany({
      where: { categoryId: id },
      include: { MenuProduct: {} },
    });
  }

  async findByName(name: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { name },
      include: { MenuProduct: {} },
    });
  }
  async create(product: Product): Promise<Product> {
    return prisma.product.create({ data: product });
  }

  async update(id: string, product: PutProductDto): Promise<Product> {
    return prisma.product.update({ where: { id }, data: product });
  }

  async delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }
}
