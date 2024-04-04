import { Injectable } from '@nestjs/common';
import { Category, CategoryPatch } from '../interfaces/category.interface';
import prisma from '../config/database';

@Injectable()
export class CategoryRepository {
  constructor() {}

  async findAll(): Promise<Category[]> {
    return prisma.category.findMany({ include: { Product: {} } });
  }

  async findById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
      include: { Product: {} },
    });
  }

  async findByName(name: string): Promise<Category | null> {
    return prisma.category.findUnique({ where: { name } });
  }
  async create(category: Category): Promise<Category> {
    return prisma.category.create({ data: category });
  }

  async update(id: string, category: CategoryPatch): Promise<Category> {
    return prisma.category.update({ where: { id }, data: category });
  }

  async delete(id: string): Promise<Category> {
    return prisma.category.delete({ where: { id } });
  }
}
